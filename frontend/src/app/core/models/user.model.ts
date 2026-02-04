export interface User {
  email: string;
  role: 'USER' | 'ADMIN';
  token: string;
}
