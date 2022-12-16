export type Gender = 'M' | 'F';

export interface PeopleProps {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  gender: Gender;
  isMinister: boolean;
  instruments?: string[];
}
