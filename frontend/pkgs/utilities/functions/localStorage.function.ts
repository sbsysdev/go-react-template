export function setIntoLocalStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to set localStorage value ${value} for key "${key}"`, error);
    return false;
  }
}

export function getFromLocalStorage<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? (JSON.parse(stored) as T) : defaultValue;
  } catch (error) {
    console.error(`Failed to parse localStorage value for key "${key}"`, error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove localStorage value for key "${key}"`, error);
    return false;
  }
}
