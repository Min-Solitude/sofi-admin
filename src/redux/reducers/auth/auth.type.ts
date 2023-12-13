export type AuthState = {
  listUser: User[] | null;
  loading: boolean;
};

export type User = {
  account: string;
  banner?: string;
  displayName?: string;
  email?: string;
  loginBy: string;
  phoneNumber?: string;
  photoURL?: string;
  role: string;
  uid: string;
  vip: {
    createdAt: Date | null;
    expiredAt: Date | null;
    package: string | null;
    isVip: boolean;
  };
};
