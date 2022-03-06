export type UserRole = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  surname: string;
  birthdata: Date;
  isBlocked: boolean;
  role: UserRole;
  userRoleId: number;
};

export type UsersRequest = {
  skip?: number;
  limit?: number;
  email?: string;
  name?: string;
  surname?: string;
};

export type UsersResponse = {
  users: User[];
};
