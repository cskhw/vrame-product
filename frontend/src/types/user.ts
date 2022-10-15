export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  photo?: string;
  verified: string;
  verification_code?: string;
  role: string;
  created_at: string;
  updated_at: string;
}
