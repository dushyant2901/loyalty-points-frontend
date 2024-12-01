
// Centralized API Request function
export const apiRequest = async (url: string, options: RequestInit): Promise<any> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong.");
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message); 
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

// Email validation function
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password validation function
export const validatePassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

// Password strength function
export const getPasswordStrength = (password: string): string => {
  let strength = '';
  if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
    strength = 'Strong';
  } else if (password.length >= 6) {
    strength = 'Medium';
  } else {
    strength = 'Weak';
  }
  return strength;
};
