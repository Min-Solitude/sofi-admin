export type SettingState = {
  loading: boolean;
  greeting: SettingGreetings;
  fileTray: SettingFileTray;
  header: SettingHeader;
};

export type SettingGreetings = {
  title: string;
  content: string;
  status: boolean;
  image: string;
  layout: boolean;
};

export type SettingFileTray = {
  background: string;
  title: string;
  status: boolean;
  noticeErr: string;
};


export type SettingHeader = {
  logo?: any | null;
  btnNotice: boolean;
  btnFullscreen: boolean;
  btnDarkMode: boolean;
  profile: boolean;
  layout: boolean;
  status: boolean;
}