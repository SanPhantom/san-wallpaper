import { SearchDataType } from "../types";

export const getImageRect = async (item: any) => {
  return new Promise<{ w: number; h: number }>((resolve) => {
    const img = new Image();
    img.src = item.thumbs.original;
    // img.setAttribute("crossorigin", "anonymous");

    img.onload = (e) => {
      let w = Number(img.width);
      let h = Number(img.height);
      resolve({ w, h });
    };
  });
};

export const formatSearchData = (
  searchData: SearchDataType,
  searchKey?: string
) => {
  return {
    q: searchKey,
    categories: ["general", "anime", "people"]
      .map((d: any) => Number(searchData.categories?.includes(d)))
      .join(""),
    purity:
      ["sfw", "sketchy"]
        .map((d: any) => Number(searchData.purity?.includes(d)))
        .join("") + "0",
    sorting: searchData.sorting?.[0],
    atleast: searchData.atleast?.[0],
  };
};

export const formatPictureItem = (item: any) => {
  return {
    ...item,
    src: item.thumbs.original,
  };
};
