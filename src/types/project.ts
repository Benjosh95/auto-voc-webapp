export interface NewProject {
  projectName: string;
  projectNumber?: string;
  projectManager?: string; 
  department?: string;
  supervisor?: string; 
  notes?: string;
  medium?: "Erdgas" | "Wasserstoff" | "CO2";
  length?: number;
  nominalWidth?: string; 
  pressureLevel?: string; 
  commissioningDate?: string;
  roadCrossings?: number; 
  railwayCrossings?: number; 
  riverCrossings?: number; 
}

export interface Project extends NewProject {
  id: string
  createdAt: string
  updatedAt: string
} 