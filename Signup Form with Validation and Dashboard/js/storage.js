/* NSCC shared local data layer.
   Keeps the project compatible with older builds that stored users under `users`.
*/
(function () {
    const PRIMARY_KEY = "nscc_users_v3";
    const LEGACY_KEY = "users";

    function read(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return [];
            const value = JSON.parse(raw);
            return Array.isArray(value) ? value : [];
        } catch (error) {
            console.error(`NSCC storage read failed for ${key}:`, error);
            return [];
        }
    }

    function normalize(user) {
        return {
            username: String(user.username || "").trim(),
            email: String(user.email || "").trim().toLowerCase(),
            password: String(user.password || ""),
            createdAt: user.createdAt || new Date().toISOString()
        };
    }

    function mergeUsers() {
        const combined = [...read(PRIMARY_KEY), ...read(LEGACY_KEY)].map(normalize);
        const seen = new Set();
        const users = [];

        for (const user of combined) {
            if (!user.username || !user.email) continue;
            const identity = `${user.username.toLowerCase()}::${user.email}`;
            if (seen.has(identity)) continue;
            seen.add(identity);
            users.push(user);
        }

        return users;
    }

    function save(users) {
        const cleanUsers = users.map(normalize);
        const serialized = JSON.stringify(cleanUsers);
        localStorage.setItem(PRIMARY_KEY, serialized);
        // Keep the old key synchronized so older versions of the project do not lose data.
        localStorage.setItem(LEGACY_KEY, serialized);
        window.dispatchEvent(new CustomEvent("nscc:users-updated"));
    }

    window.NSCCStorage = {
        key: PRIMARY_KEY,
        getUsers: mergeUsers,
        saveUsers: save
    };
})();
