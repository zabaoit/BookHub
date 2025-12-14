export interface User {
  _id: string;
  username: string;
  email: string;
  roles?: string;
  refreshToken?: string;
  createdAt?: string;
  updatedAt?: string;
}
