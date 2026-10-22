// localStorage can throw (private mode, blocked site data) or be unavailable.
// Preferences are a convenience, so a failure just means "no saved value".

export function readPref(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writePref(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Not saved; the choice still applies for this visit.
  }
}
