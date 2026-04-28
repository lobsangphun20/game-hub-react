import noImage from "../assets/no-image.webp";

const getCroppedImageUrl = (url: string) => {

  if (!url) return noImage;

    const target = "media/";
    const index = url.indexOf(target) + target.length; // i.e. from starting to the end of "media/"

  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
