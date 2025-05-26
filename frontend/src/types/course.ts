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
  direction?: number;  // Add direction property for traversal direction (0-360°)
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
    direction?: number; // Direction in degrees (0-360°)
  };
  finishPoint: {
    x: number;
    y: number;
    direction?: number; // Direction in degrees (0-360°)
  };
}
