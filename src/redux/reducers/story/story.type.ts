export type StoryState = {
  listStory?: Story[];
  loading?: boolean;
};

export type Story = {
  account: string;
  dateSend: Number;
  displayName: string;
  email: string;
  isVip: boolean;
  phoneNumber: string;
  photoURL: string;
  status: string;
  story: string;
  uid: string;
};
