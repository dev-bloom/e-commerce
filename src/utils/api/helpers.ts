import { Product, ProductSkeleton } from "@/pages/api/products";
import contentfulClient from "../contentfulClient";
import { Asset, EntriesQueries } from "contentful";

export const getRelatedProducts = async (
  product: Product
): Promise<Product[]> => {
  if (!product.fields.relatedProducts?.length) {
    return [];
  }
  const relatedProductsResponse =
    await contentfulClient.withoutLinkResolution.getEntries<ProductSkeleton>({
      content_type: "product",
      "sys.id[in]": product.fields.relatedProducts
        .map((relatedProduct) => relatedProduct.sys.id)
        .join(","),
    } as EntriesQueries<ProductSkeleton, undefined>);
  return relatedProductsResponse.items;
};

export const getProductGallery = async (product: Product): Promise<Asset[]> => {
  if (!product.fields.gallery?.length) {
    return [];
  }
  const galleryResponse = await contentfulClient.getAssets({
    "sys.id[in]": product.fields.gallery.map(
      (galleryImage) => galleryImage.sys.id
    ),
  });
  return galleryResponse.items;
};

export const getFirstProductGalleryImage = async (
  product: Product
): Promise<Asset[]> => {
  if (!product.fields.gallery?.length) {
    return [];
  }
  const [firstImageLink, ...restGallery] = product.fields.gallery;
  const firstAsset = await contentfulClient.getAsset(firstImageLink.sys.id);
  return [firstAsset, ...restGallery];
};
