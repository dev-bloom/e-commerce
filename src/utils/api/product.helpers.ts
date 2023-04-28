import { Product, ProductSkeleton } from "@/types";
import { Asset, EntriesQueries } from "contentful";
import contentfulClient from "../contentfulClient";

export const getProducts = async (skip = 0): Promise<Product[]> => {
  const products =
    await contentfulClient.withoutLinkResolution.getEntries<ProductSkeleton>({
      content_type: "product",
      limit: 20,
      skip,
    });

  const mappedProducts = await Promise.all(
    products.items.map(async (product) => ({
      ...product,
      fields: {
        ...product.fields,
        gallery: await getFirstProductGalleryImage(product),
      },
    }))
  );

  return mappedProducts;
};

export const getProduct = async (slug: string): Promise<Product | null> => {
  const products =
    await contentfulClient.withoutLinkResolution.getEntries<ProductSkeleton>({
      content_type: "product",
      "fields.slug": slug,
      limit: 1,
    } as EntriesQueries<ProductSkeleton, undefined>);
  const product: Product = products.items[0];
  if (!product) {
    return null;
  }

  const [relatedProducts, productGallery] = await Promise.all([
    getRelatedProducts(product),
    getProductGallery(product),
  ]);

  return {
    ...product,
    fields: {
      ...product.fields,
      relatedProducts,
      gallery: productGallery,
    },
  };
};

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
  const relatedProductsWithFirstImage = await Promise.all(
    relatedProductsResponse.items.map(async (relatedProduct) => ({
      ...relatedProduct,
      fields: {
        ...relatedProduct.fields,
        gallery: await getFirstProductGalleryImage(relatedProduct),
      },
    }))
  );
  return relatedProductsWithFirstImage;
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
