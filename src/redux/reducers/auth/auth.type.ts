export type AuthState = {
  accessToken: string;
  account: accountState;
  loading: boolean;
};

type accountState = {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  member: boolean;
};

export type AuthPayload = {
  email: string;
  password: string;
};
