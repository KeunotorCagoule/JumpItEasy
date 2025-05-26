export interface UserProfile {
  id: string;
  username: string;
  email: string;
  bio?: string;
  country?: string;
  language?: string;
  joinedDate: string;
  favoriteCourses: number;
  completedCourses: number;
  createdCourses: number;
}

export interface UserSettings {
  username: string;
  email: string;
  bio: string;
  country: string;
  language: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email?: string;
  language?: string;
}
