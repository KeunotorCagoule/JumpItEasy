import { CourseLayout } from './course';

export interface Parcours {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  difficulty: string;
  course_type: string;
  waterElements: boolean;
  private: boolean;
  course_layout?: CourseLayout; // Add course layout
  created_at?: string;
  is_favorite?: boolean;
  is_completed?: boolean;
  completion_rate?: number;
  completed_at?: string;
  username?: string; // Creator's username
}

// Interface for course creation/generation
export interface ParcoursData {
  title: string;
  description: string;
  difficulty: string;
  water: boolean;
  courseType: string;
  isPrivate: boolean;
  course_layout?: CourseLayout; // Add course layout for saving generated courses
}

// Interface for course filters in generation
export interface ParcoursFilters {
  title: string;
  description: string;
  isPrivate: boolean;
  duration: number;
  obstacleCount: number;
  hasWaterElements: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: 'None' | 'Basic' | 'Full Set';
  courseType: '1' | '2' | '3';
}

// Interface for backend response with snake_case properties
export interface ParcoursBackendResponse {
  id: string;
  title: string;
  description: string;
  creator_id: string;
  difficulty: string;
  course_type: string;
  water_elements: boolean;
  course_layout?: CourseLayout; // JSON course layout
  private: boolean;
  created_at?: string;
  is_favorite?: boolean;
  is_completed?: boolean;
  completion_rate?: number;
  completed_at?: string;
  username?: string;
}

// Interface for completion status
export interface CourseCompletion {
  completed: boolean;
  completion_rate: number;
  completed_at: string | null;
  id?: number;
}
