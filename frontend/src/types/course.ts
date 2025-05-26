// Re-export types from parcours for compatibility
export type { ParcoursFilters as CourseFilters } from './parcours';

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
  number?: number;     // Add number property for ordering
  shape?: string;      // Add shape property (rectangle for hurdles, circle for water)
  direction?: string;  // Add direction property for traversal direction
}

export interface CourseLayout {
  id: string;
  name: string;
  description: string;
  duration: number;
  obstacleCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  obstacles: Obstacle[];
  startPoint: {
    x: number;
    y: number;
  };
  finishPoint: {
    x: number;
    y: number;
  };
}
