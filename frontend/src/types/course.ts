export interface CourseFilters {
  title: string;
  description: string;
  isPrivate: boolean;
  duration: number;
  obstacleCount: number;
  hasWaterElements: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  terrainType: 'Urban' | 'Nature' | 'Mixed';
  heightRange: 'Ground Level' | 'Medium' | 'High';
  equipment: 'None' | 'Basic' | 'Full Set';
  courseType: '1' | '2' | '3';
  environment: 'Indoor' | 'Outdoor';
  safetyFeatures: 'Basic' | 'Standard' | 'Enhanced';
}

export interface Obstacle {
  id: string;
  name: string;
  type: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  techniques: string[];
  height: number;
  position: {
    x: number;
    y: number;
  };
  safetyNotes: string[];
}

export interface CourseLayout {
  id: string;
  name: string;
  description: string;
  duration: number;
  obstacleCount: number;
  difficulty: CourseFilters['difficulty'];
  obstacles: Obstacle[];
  warmupExercises: string[];
  restPoints: Array<{ id: string; position: { x: number; y: number } }>;
  progressMarkers: Array<{ id: string; position: { x: number; y: number }; checkpoint: number }>;
  safetyConsiderations: string[];
}
