export const ADMIN_AUTH_KEY = "inm_admin_authed";

export function isAdminAuthed(): boolean {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

export function setAdminAuthed(value = true) {
  try {
    if (value) localStorage.setItem(ADMIN_AUTH_KEY, "1");
    else localStorage.removeItem(ADMIN_AUTH_KEY);
  } catch {
    // ignore
  }
}

export function clearAdminAuthed() {
  setAdminAuthed(false);
}

