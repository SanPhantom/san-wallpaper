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
