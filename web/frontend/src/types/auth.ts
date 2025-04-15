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
  acceptTerms: boolean;
}
