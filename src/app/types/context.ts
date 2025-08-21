export interface ILayoutProp {
  pattern: string;
  img?: string;
  text?: string;
}

export interface ILayout {
  home: ILayoutProp[];
  about: ILayoutProp[];
}

export interface IContent {
  home: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  about: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IThemeData {
  lang: string;
  themeLayout: ILayout;
  themeContent: IContent;
  themeColor1: string;
  themeColor2: string;
  themeColor3: string;
}

export type IThemeDefaultData = Partial<IThemeData>;

export interface IThemeContext extends IThemeData {
  changeLanguage: (language: string) => void;
  changeThemeColor1: (color: string) => void;
  changeThemeColor2: (color: string) => void;
  changeThemeColor3: (color: string) => void;
}
