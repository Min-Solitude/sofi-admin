export type AltarState = {
  loading: boolean;
  data: Altar[];
};

export type Altar = {
  content: string;
  dateSend: string;
  status: string;
  uid: string;
  account: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
};
