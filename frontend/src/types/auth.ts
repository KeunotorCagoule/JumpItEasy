export interface LoginFormData {
  usernameOrEmail: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  language: string; // Nouvelle propriété pour la langue
  acceptTerms: boolean;
}
