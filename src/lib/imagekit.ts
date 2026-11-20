/**
 * Helper para optimizar imágenes alojadas en ImageKit.
 * ImageKit Endpoint ID: ns9uknww8b
 */
export const IMAGEKIT_ENDPOINT = "https://ik.imagekit.io/ns9uknww8b";

export function getImageKitUrl(
  pathOrName: string,
  transforms: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "auto" | "webp" | "avif" | "jpg" | "png";
  } = {}
) {
  const cleanPath = pathOrName.replace(/^\/+/, "");
  const trParts: string[] = [];

  if (transforms.width) trParts.push(`w-${transforms.width}`);
  if (transforms.height) trParts.push(`h-${transforms.height}`);
  if (transforms.quality) trParts.push(`q-${transforms.quality}`);
  if (transforms.format) trParts.push(`f-${transforms.format}`);

  if (trParts.length > 0) {
    return `${IMAGEKIT_ENDPOINT}/tr:${trParts.join(",")}/${cleanPath}`;
  }

  return `${IMAGEKIT_ENDPOINT}/${cleanPath}`;
}
