export function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, 500) // Max length limit
    .replace(/[<>]/g, ''); // Basic XSS prevention
}

export function validateTodoText(text: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeInput(text);
  
  if (sanitized.length === 0) {
    return { isValid: false, error: 'Todo text cannot be empty' };
  }
  
  if (sanitized.length > 500) {
    return { isValid: false, error: 'Todo text cannot exceed 500 characters' };
  }
  
  return { isValid: true };
}

export function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getStorageUsage(): { used: number; total: number; percentage: number } {
  if (!isStorageAvailable()) {
    return { used: 0, total: 0, percentage: 0 };
  }
  
  let used = 0;
  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      used += localStorage[key].length + key.length;
    }
  }
  
  // Rough estimate of localStorage limit (usually 5-10MB)
  const total = 5 * 1024 * 1024; // 5MB
  const percentage = (used / total) * 100;
  
  return { used, total, percentage };
}