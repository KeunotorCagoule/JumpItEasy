export interface CourseFilters {
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
  difficulty: CourseFilters['difficulty'];
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
