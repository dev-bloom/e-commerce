import contentfulClient from "../contentfulClient";

import { Branding, BrandingSkeleton } from "@/types";

let brandingCache: Branding | null = null;

export const getBranding = async (): Promise<Branding> => {
  if (brandingCache) return brandingCache;
  const response = await contentfulClient.getEntries<BrandingSkeleton>({
    content_type: "branding",
    limit: 1,
  });
  brandingCache = response.items[0];
  return brandingCache;
};
