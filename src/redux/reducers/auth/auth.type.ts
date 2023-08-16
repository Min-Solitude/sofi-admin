export type AuthState = {
  accessToken: string;
  account: any;
  accountGoogle: accountGoogleState;
};

type accountGoogleState = {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
};

export type AuthPayload = {
  email: string;
  password: string;
};
