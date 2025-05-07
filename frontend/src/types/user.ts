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

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  date: string;
  completionRate?: number;
  creatorId: string;
  courseType: string;
  waterElements: boolean;
  private: boolean;
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
