import { BLOCKS, Document } from "@contentful/rich-text-types";
import { Asset, EntrySys, Metadata } from "contentful";

import { Branding, BrandingFields, Product, ProductFields } from "@/types";

import { defaultValueIfUndefined } from "./helpers";

export const getMockDocument = (values: string[] = []): Document => ({
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: values.map((value) => ({
    nodeType: BLOCKS.PARAGRAPH,
    data: {},
    content: [
      {
        nodeType: "text",
        value,
        marks: [],
        data: {},
      },
    ],
  })),
});

export const getMockAssetImage = (
  url: string = `https://${Math.random().toString()}`
): Asset => ({
  sys: {
    type: "Asset",
    id: "assetId",
    createdAt: "2021-05-02T15:00:00.000Z",
    updatedAt: "2021-05-02T15:00:00.000Z",
    revision: 1,
    space: {
      sys: {
        type: "Link",
        linkType: "Space",
        id: "spaceId",
      },
    },
    environment: {
      sys: {
        id: "master",
        type: "Link",
        linkType: "Environment",
      },
    },
  },
  fields: {
    title: "Image",
    description: "Image",
    file: {
      url,
      details: {
        size: 100,
        image: {
          width: 100,
          height: 100,
        },
      },
      fileName: "image.png",
      contentType: "image/png",
    },
  },
  metadata: {
    tags: [],
  },
});

const getMockEntrySys = ({
  id,
  contentType,
}: {
  id?: string;
  contentType?: string;
} = {}): EntrySys => ({
  space: {
    sys: {
      type: "Link",
      linkType: "Space",
      id: "spaceId",
    },
  },
  type: "Entry",
  id: id ?? Math.random().toString(),
  createdAt: "2021-05-02T15:00:00.000Z",
  updatedAt: "2021-05-02T15:00:00.000Z",
  environment: {
    sys: {
      id: "master",
      type: "Link",
      linkType: "Environment",
    },
  },
  revision: 1,
  contentType: {
    sys: {
      type: "Link",
      linkType: "ContentType",
      id: contentType ?? "product",
    },
  },
  locale: "en-US",
});

const getMockEntryMeta = (tags: string[] = []): Metadata => ({
  tags: tags.map((tag) => ({
    sys: {
      type: "Link",
      linkType: "Tag",
      id: tag,
    },
  })),
});

export const getMockProduct = (
  productFields: Partial<ProductFields> = {}
): Product => ({
  sys: getMockEntrySys(),
  fields: {
    name: productFields.name ?? Math.random().toString(),
    shortDescription: productFields.shortDescription ?? "Short description",
    longDescription:
      productFields.longDescription ?? getMockDocument(["Long description"]),
    price: defaultValueIfUndefined(productFields.price, 10),
    tags: productFields.tags ?? ["tag1", "tag2"],
    stock: defaultValueIfUndefined(productFields.stock, 10),
    slug: productFields.slug ?? "product-1",
    allowBackorder: productFields.allowBackorder ?? false,
    discountPercent: defaultValueIfUndefined(productFields.discountPercent, 10),
    gallery: defaultValueIfUndefined(productFields.gallery, [
      getMockAssetImage(),
    ]),
    relatedProducts: productFields.relatedProducts ?? [],
  },
  metadata: getMockEntryMeta(),
});

export const getMockBranding = (
  brandingFields: Partial<BrandingFields> = {}
): Branding => ({
  sys: getMockEntrySys({ contentType: "branding" }),
  fields: {
    logo: defaultValueIfUndefined(brandingFields.logo, getMockAssetImage()),
    companyName: brandingFields.companyName ?? "Brand",
    primaryColor: brandingFields.primaryColor ?? "#000000",
    secondaryColor: brandingFields.secondaryColor ?? "#111111",
    tertiaryColor: brandingFields.tertiaryColor ?? "#222222",
  },
  metadata: getMockEntryMeta(),
});
