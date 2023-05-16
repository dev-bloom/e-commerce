import type { Branding, BrandingSkeleton } from "@/types";

import contentfulClient from "../contentfulClient";

let brandingCache: Branding | null = null;

/**
 * @returns The branding for the site
 * @description
 * This method is used to get the branding for the site.
 * It will return null if there is no branding.
 **/
export const getBranding = async (): Promise<Branding> => {
  if (brandingCache) {
    return brandingCache;
  }
  const response = await contentfulClient.getEntries<BrandingSkeleton>({
    content_type: "branding",
    limit: 1,
  });
  brandingCache = response.items[0];
  return brandingCache;
};
