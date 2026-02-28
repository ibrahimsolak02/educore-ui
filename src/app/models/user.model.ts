export interface RegisterRequest {
  username: string;
  password: string;
  role: 'student' | 'teacher';
}