import { SearchDataType } from '../types';

export const getImageRect = async (item: any) => {
  return new Promise<{ w: number; h: number }>((resolve) => {
    const img = new Image();
    img.src = item.thumbs.original;
    // img.setAttribute("crossorigin", "anonymous");

    img.onload = () => {
      let w = Number(img.width);
      let h = Number(img.height);
      resolve({ w, h });
    };
  });
};

export const formatSearchData = (searchData: SearchDataType, searchKey?: string) => {
  return {
    q: searchKey,
    categories: ['general', 'anime', 'people']
      .map((d: any) => Number(searchData.categories?.includes(d)))
      .join(''),
    purity:
      ['sfw', 'sketchy'].map((d: any) => Number(searchData.purity?.includes(d))).join('') + '0',
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

/**
 * 获取图片的 base64 编码 DataURL
 * @param image JS 图像对象
 * @return {string} 已编码的 DataURL
 */
export const getImageDataURL = (image: { width: number; height: number; url: string }) => {
  // 创建画布
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const img = new Image();
  img.src = image.url;
  const ctx = canvas.getContext('2d');
  // 以图片为背景剪裁画布
  ctx?.drawImage(img, 0, 0, image.width, image.height);
  // 获取图片后缀名
  const extension = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
  // 某些图片 url 可能没有后缀名，默认是 png
  return canvas.toDataURL('image/' + extension, 1);
};
