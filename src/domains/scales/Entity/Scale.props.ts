export type Band = Array<{ instrument: string, person: string }>;

export interface ScaleProps {
  id: string;
  date: Date;
  band: Band;
  singers: string[];
  musics: string[];
}
