import type { Asset } from "contentful";

import type { ContentFulEntry } from "./global.types";

export type BrandingFields = {
  companyName: string;
  logo: Asset;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
};

export type BrandingSkeleton = {
  fields: BrandingFields;
  contentTypeId: "branding";
};

export type Branding = ContentFulEntry<BrandingFields>;
