export interface UserProfile {
  id: string;
  username: string;
  email: string;
  bio?: string;
  location?: string;
  joinedDate: string;
  favoriteCourses: number;
  completedCourses: number;
  createdCourses: number;
}

export interface Course {
  id: string;
  title: string;
  difficulty: string;
  date: string;
  completionRate?: number;
}

export interface UserSettings {
  username: string;
  email: string;
  bio: string;
  location: string;
  language: string;
  darkMode: boolean;
  emailNotifications: boolean;
  appNotifications: boolean;
  marketingEmails: boolean;
  twoFactorAuth: boolean;
  publicProfile: boolean;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
