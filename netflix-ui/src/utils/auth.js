const USERS_KEY = "netflix_clone_users";
const SESSION_KEY = "netflix_clone_session";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

function saveSession(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
  window.dispatchEvent(new Event("auth-changed"));
}

export const firebaseAuth = {};

export function onAuthStateChanged(_auth, callback) {
  callback(loadSession());
  const handler = () => callback(loadSession());
  window.addEventListener("auth-changed", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("auth-changed", handler);
    window.removeEventListener("storage", handler);
  };
}

export async function createUserWithEmailAndPassword(_auth, email, password) {
  const trimmedEmail = (email || "").trim().toLowerCase();
  if (!trimmedEmail || !password) {
    const err = new Error("Email and password are required.");
    err.code = "auth/invalid-credential";
    throw err;
  }
  if (password.length < 6) {
    const err = new Error("Password should be at least 6 characters.");
    err.code = "auth/weak-password";
    throw err;
  }

  const users = loadUsers();
  if (users.some((user) => user.email === trimmedEmail)) {
    const err = new Error("This email is already registered. Try logging in.");
    err.code = "auth/email-already-in-use";
    throw err;
  }

  const user = {
    email: trimmedEmail,
    uid: crypto.randomUUID(),
  };
  users.push({ ...user, password });
  saveUsers(users);
  saveSession(user);
  return { user };
}

export async function signInWithEmailAndPassword(_auth, email, password) {
  const trimmedEmail = (email || "").trim().toLowerCase();
  const users = loadUsers();
  const found = users.find(
    (user) => user.email === trimmedEmail && user.password === password
  );
  if (!found) {
    const err = new Error("Invalid email or password.");
    err.code = "auth/invalid-credential";
    throw err;
  }
  const user = { email: found.email, uid: found.uid };
  saveSession(user);
  return { user };
}

export async function signOut(_auth) {
  saveSession(null);
}
