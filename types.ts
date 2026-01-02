
export type Language = 'en' | 'es' | null;

export interface SystemFile {
  path: string;
  status: 'verified' | 'corrupted' | 'restoring';
  hash: string;
}

export enum SystemState {
  BOOTING = 'BOOTING',
  COVENANT = 'COVENANT',
  OPERATIONAL = 'OPERATIONAL',
  MAINTENANCE = 'MAINTENANCE'
}

export interface GuardianState {
  language: Language;
  state: SystemState;
  integrityScore: number;
  files: SystemFile[];
}
