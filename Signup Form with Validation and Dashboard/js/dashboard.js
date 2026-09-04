const AUTH_KEY = "nscc_admin_authenticated";
const USER_KEY = "nscc_admin_username";

if (sessionStorage.getItem(AUTH_KEY) !== "true") {
    window.location.replace("admin.html");
} else {
    const tableBody = document.getElementById("userTableBody");
    const emptyMessage = document.getElementById("emptyMessage");
    const noResults = document.getElementById("noResults");
    const totalUsers = document.getElementById("totalUsers");
    const resultCount = document.getElementById("resultCount");
    const searchInput = document.getElementById("searchInput");
    const clearSearch = document.getElementById("clearSearch");
    const adminName = document.getElementById("adminName");
    const adminAvatar = document.getElementById("adminAvatar");
    const sessionUser = document.getElementById("sessionUser");
    const logoutButton = document.getElementById("logoutButton");
    const deleteModal = document.getElementById("deleteModal");
    const cancelDelete = document.getElementById("cancelDelete");
    const confirmDelete = document.getElementById("confirmDelete");
    const sidebar = document.getElementById("sidebar");
    const openSidebar = document.getElementById("openSidebar");
    const closeSidebar = document.getElementById("closeSidebar");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const toast = document.getElementById("toast");

    let deleteIdentity = null;

    function getUsers() {
        return NSCCStorage.getUsers();
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 2600);
    }

    function initials(name) {
        const clean = String(name || "?").trim();
        return clean.slice(0, 2).toUpperCase() || "?";
    }

    function formatDate(value) {
        if (!value) return "—";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "—";
        return date.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
    }

    function makeCellText(text) {
        return document.createTextNode(String(text ?? ""));
    }

    function renderUsers() {
        const users = getUsers();
        const query = searchInput.value.trim().toLowerCase();

        totalUsers.textContent = String(users.length);
        tableBody.innerHTML = "";

        const filtered = users
            .map((user, index) => ({ user, index }))
            .filter(({ user }) =>
                user.username.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query)
            );

        emptyMessage.classList.toggle("hidden", users.length !== 0);
        noResults.classList.toggle("hidden", users.length === 0 || filtered.length !== 0);

        filtered.forEach(({ user }) => {
            const row = document.createElement("tr");

            const memberCell = document.createElement("td");
            const memberWrap = document.createElement("div");
            memberWrap.className = "member-cell";
            const avatar = document.createElement("span");
            avatar.className = "member-avatar";
            avatar.textContent = initials(user.username);
            const memberInfo = document.createElement("div");
            const name = document.createElement("strong");
            name.textContent = user.username;
            const label = document.createElement("small");
            label.textContent = "NSCC member";
            memberInfo.append(name, label);
            memberWrap.append(avatar, memberInfo);
            memberCell.appendChild(memberWrap);

            const emailCell = document.createElement("td");
            emailCell.appendChild(makeCellText(user.email));

            const createdCell = document.createElement("td");
            createdCell.appendChild(makeCellText(formatDate(user.createdAt)));

            const securityCell = document.createElement("td");
            const badge = document.createElement("span");
            badge.className = "security-badge";
            badge.textContent = "SHA-256";
            securityCell.appendChild(badge);

            const actionCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "delete-btn";
            deleteButton.textContent = "Remove";
            deleteButton.addEventListener("click", () => {
                deleteIdentity = { username: user.username, email: user.email };
                deleteModal.classList.remove("hidden");
            });
            actionCell.appendChild(deleteButton);

            row.append(memberCell, emailCell, createdCell, securityCell, actionCell);
            tableBody.appendChild(row);
        });

        resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "member" : "members"}`;
    }

    function closeDeleteModal() {
        deleteIdentity = null;
        deleteModal.classList.add("hidden");
    }

    confirmDelete.addEventListener("click", () => {
        if (!deleteIdentity) return;

        const users = getUsers();
        const remaining = users.filter(user =>
            !(user.username === deleteIdentity.username && user.email === deleteIdentity.email)
        );

        NSCCStorage.saveUsers(remaining);
        closeDeleteModal();
        renderUsers();
        showToast("Member removed.");
    });

    cancelDelete.addEventListener("click", closeDeleteModal);
    deleteModal.addEventListener("click", event => {
        if (event.target === deleteModal) closeDeleteModal();
    });

    searchInput.addEventListener("input", renderUsers);
    clearSearch.addEventListener("click", () => {
        searchInput.value = "";
        renderUsers();
        searchInput.focus();
    });

    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(USER_KEY);
        window.location.replace("admin.html");
    });

    const currentAdmin = sessionStorage.getItem(USER_KEY) || "meow";
    adminName.textContent = currentAdmin;
    adminAvatar.textContent = currentAdmin.charAt(0).toUpperCase();
    sessionUser.textContent = `Signed in as ${currentAdmin}`;

    openSidebar.addEventListener("click", () => {
        sidebar.classList.add("open");
        mobileOverlay.classList.add("show");
    });

    function closeMenu() {
        sidebar.classList.remove("open");
        mobileOverlay.classList.remove("show");
    }

    closeSidebar.addEventListener("click", closeMenu);
    mobileOverlay.addEventListener("click", closeMenu);

    // Refresh when another tab/window changes the shared localStorage data.
    window.addEventListener("storage", event => {
        if (event.key === "users" || event.key === NSCCStorage.key) renderUsers();
    });

    window.addEventListener("nscc:users-updated", renderUsers);
    window.addEventListener("pageshow", renderUsers);
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) renderUsers();
    });

    renderUsers();
}
