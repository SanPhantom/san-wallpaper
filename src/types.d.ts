export enum CategoryEnum {
  "general" = "100",
  "anime" = "101",
  "people" = "111",
}

export enum CategoryTypeEnum {
  "general" = "一般",
  "anime" = "动漫",
  "people" = "人物",
}

export const categories: (keyof typeof CategoryEnum)[] = [
  "general",
  "anime",
  "people",
];

export enum PurityEnum {
  "sfw" = "100",
  "sketchy" = "110",
}

export enum PurityTypeEnum {
  "sfw" = "常规",
  "sketchy" = "开放",
}

export const purities: (keyof typeof PurityEnum)[] = ["sfw", "sketchy"];

export enum SortEnum {
  "toplist" = "排行",
  "date_added" = "最新",
  "views" = "浏览",
  "favorites" = "收藏",
}
export const sorts: (keyof typeof SortEnum)[] = [
  "toplist",
  "date_added",
  "views",
  "favorites",
];

export enum AtLeastEnum {
  "1920x1080" = "1080P",
  "2560x1440" = "2K",
  "3840x2160" = "4K",
}
export const atleasts: (keyof typeof AtLeastEnum)[] = [
  "1920x1080",
  "2560x1440",
  "3840x2160",
];

export type SearchDataType = {
  categories?: string;
  purity?: string;
  sorting?: string;
  atleast?: string;
};
