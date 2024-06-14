import { imageMaxFileSize, imageMinFileSize, imageTypeAccepted, imageExtension } from "./constraint";

export function validateImageType(image) {
  let imageType = image[0].type;
  let alertErr = {}
  if (imageTypeAccepted.includes(imageType)) {
    alertErr.err = true;
  } else {
    alertErr.err = false;
    alertErr.message = `Định dạng ảnh có đuôi ${imageExtension.join(", ")}`;
  }
  return alertErr;
}

export function validateImageSize(image) {
  let imageSize = image[0].size;
  if (imageSize > imageMinFileSize && imageSize < imageMaxFileSize) {
    return true
  }
  return false
}