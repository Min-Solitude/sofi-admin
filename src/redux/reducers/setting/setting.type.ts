export type SettingState = {
  loading: boolean;
  greeting: SettingGreetings;
};

export type SettingGreetings = {
  title: string;
  content: string;
  status: boolean;
};
