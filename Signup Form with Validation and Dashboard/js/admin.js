const ADMIN_USERNAME = "meow";
const ADMIN_PASSWORD_HASH = "81a103d766de77d8a2224fbab8294cc9e956c8224b30041c668cc98c205b8b82";

const loginForm = document.getElementById("adminLoginForm");
const usernameInput = document.getElementById("adminUsername");
const passwordInput = document.getElementById("adminPassword");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const loginError = document.getElementById("loginError");
const loginButton = document.getElementById("loginButton");
const loginButtonText = document.getElementById("loginButtonText");
const loginLoader = document.getElementById("loginLoader");
const togglePassword = document.getElementById("toggleAdminPassword");

async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

togglePassword.addEventListener("click", () => {
    const visible = passwordInput.type === "text";
    passwordInput.type = visible ? "password" : "text";
    togglePassword.textContent = visible ? "Show" : "Hide";
});

function clearErrors() {
    usernameError.textContent = "";
    passwordError.textContent = "";
    loginError.textContent = "";
    loginError.classList.add("hidden");
    usernameInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");
}

loginForm.addEventListener("submit", async event => {
    event.preventDefault();
    clearErrors();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username) {
        usernameError.textContent = "Administrator ID is required.";
        usernameInput.classList.add("input-error");
        return;
    }

    if (!password) {
        passwordError.textContent = "Passphrase is required.";
        passwordInput.classList.add("input-error");
        return;
    }

    loginButton.disabled = true;
    loginButtonText.textContent = "Authenticating";
    loginLoader.classList.remove("hidden");

    try {
        const passwordHash = await hashPassword(password);
        const valid = username === ADMIN_USERNAME && passwordHash === ADMIN_PASSWORD_HASH;

        if (!valid) {
            loginError.textContent = "Invalid administrator credentials.";
            loginError.classList.remove("hidden");
            passwordInput.value = "";
            return;
        }

        sessionStorage.setItem("nscc_admin_authenticated", "true");
        sessionStorage.setItem("nscc_admin_username", ADMIN_USERNAME);

        loginButtonText.textContent = "Access granted";
        await new Promise(resolve => setTimeout(resolve, 450));
        window.location.replace("dashboard.html");
    } catch (error) {
        console.error(error);
        loginError.textContent = "Authentication failed. Please try again.";
        loginError.classList.remove("hidden");
    } finally {
        loginButton.disabled = false;
        loginLoader.classList.add("hidden");
        loginButtonText.textContent = "Sign in securely";
    }
});