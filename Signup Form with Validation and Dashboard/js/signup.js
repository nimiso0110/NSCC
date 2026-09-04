const form = document.getElementById("signupForm");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const termsInput = document.getElementById("terms");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const termsError = document.getElementById("termsError");
const successMessage = document.getElementById("successMessage");

const togglePassword = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strengthBar");
const passwordScore = document.getElementById("passwordScore");
const signupButton = document.getElementById("signupButton");
const signupButtonText = document.getElementById("signupButtonText");
const signupLoader = document.getElementById("signupLoader");
const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2800);
}

async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

function validEmail(email) {
    // Valid email syntax: local part + DNS-style domain + real-looking TLD.
    // A frontend cannot prove that a mailbox actually exists without sending a verification email.
    return /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/.test(email);
}

function clearErrors() {
    [usernameError, emailError, passwordError, termsError].forEach(el => el.textContent = "");
    [usernameInput, emailInput, passwordInput].forEach(el => el.classList.remove("input-error"));
    successMessage.textContent = "";
}

function passwordStrength(password) {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.min(score, 4);
}

function updateStrength() {
    const score = passwordStrength(passwordInput.value);
    const widths = ["0%", "25%", "50%", "75%", "100%"];
    const labels = ["—", "Weak", "Fair", "Good", "Strong"];
    strengthBar.style.width = widths[score];
    passwordScore.textContent = labels[score];
}

togglePassword.addEventListener("click", () => {
    const visible = passwordInput.type === "text";
    passwordInput.type = visible ? "password" : "text";
    togglePassword.textContent = visible ? "Show" : "Hide";
});

passwordInput.addEventListener("input", updateStrength);

form.addEventListener("submit", async event => {
    event.preventDefault();
    clearErrors();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    let valid = true;

    if (!/^[A-Za-z0-9_]{3,30}$/.test(username)) {
        usernameError.textContent = "Use 3–30 letters, numbers or underscores.";
        usernameInput.classList.add("input-error");
        valid = false;
    }

    if (!validEmail(email)) {
        emailError.textContent = "Enter a valid email address, such as a Gmail, Outlook, Hotmail, university or school address.";
        emailInput.classList.add("input-error");
        valid = false;
    }

    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        passwordInput.classList.add("input-error");
        valid = false;
    }

    if (!termsInput.checked) {
        termsError.textContent = "Please accept the registration terms.";
        valid = false;
    }

    if (!valid) return;

    const users = NSCCStorage.getUsers();

    if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        usernameError.textContent = "That username is already registered.";
        usernameInput.classList.add("input-error");
        return;
    }

    if (users.some(user => user.email.toLowerCase() === email)) {
        emailError.textContent = "That email is already registered.";
        emailInput.classList.add("input-error");
        return;
    }

    signupButton.disabled = true;
    signupButtonText.textContent = "Creating account";
    signupLoader.classList.remove("hidden");

    try {
        const hashedPassword = await hashPassword(password);
        users.push({ username, email, password: hashedPassword, createdAt: new Date().toISOString() });
        NSCCStorage.saveUsers(users);

        form.reset();
        updateStrength();
        successMessage.textContent = "Account created successfully.";
        showToast(`Account created for ${username}.`);

        // When an administrator chose “Add member”, return directly to the directory.
        const fromAdmin = new URLSearchParams(window.location.search).get("from") === "admin";
        const isAdmin = sessionStorage.getItem("nscc_admin_authenticated") === "true";
        if (fromAdmin && isAdmin) {
            window.setTimeout(() => window.location.replace("dashboard.html"), 650);
        }
    } catch (error) {
        console.error("Signup error:", error);
        showToast("Could not create the account. Please try again.");
    } finally {
        signupButton.disabled = false;
        signupButtonText.textContent = "Create account";
        signupLoader.classList.add("hidden");
    }
});
