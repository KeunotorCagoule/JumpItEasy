export interface Parcours {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  difficulty: string;
  courseType: string;
  waterElements: boolean;
  private: boolean;
  created_at?: string;
  is_favorite?: boolean;
  username?: string; // Creator's username
  completion_rate?: number; // For user progress tracking
}

// Interface for course creation/generation
export interface ParcoursData {
  title: string;
  description: string;
  difficulty: string;
  water: boolean;
  courseType: string;
  isPrivate: boolean;
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
  private: boolean;
  created_at?: string;
  is_favorite?: boolean;
  username?: string;
}
