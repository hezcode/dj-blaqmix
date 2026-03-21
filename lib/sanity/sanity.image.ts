import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity/sanity.client";

const builder = createImageUrlBuilder(sanityClient);

export const urlFor = (source: unknown) => {
  return builder.image(source as never);
};
