export type SettingState = {
  loading: boolean;
  greeting: SettingGreetings;
  fileTray: SettingFileTray;
};

export type SettingGreetings = {
  title: string;
  content: string;
  status: boolean;
};

export type SettingFileTray = {
  background: string;
  title: string;
  status: boolean;
  noticeErr: string;
};
