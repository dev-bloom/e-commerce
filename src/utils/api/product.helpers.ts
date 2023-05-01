import { Product, ProductSkeleton } from "@/types";
import { Asset, EntriesQueries } from "contentful";
import contentfulClient from "../contentfulClient";

/**
 * @param skip - The number of products to skip
 * @returns The products
 * @description
 * This method is used to get the products.
 * It will return an empty array if there are no products.
 * The products are sorted by the date they were created.
 * The products are limited to 20 per page.
 **/
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

/**
 * @param slug - The slug of the product to get
 * @returns The product with the given slug
 * @description
 * This method is used to get a product by its slug.
 * It will return null if there is no product with the given slug.
 * The product is sorted by the date it was created.
 * The product has its related products and gallery images populated.
 **/
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

/**
 * @param product - The product to get the first gallery image for
 * @returns The first gallery image for the product
 * @description
 * This method is used to get the first gallery image for a product.
 * It will return null if there are no gallery images for the product.
 * The gallery images are sorted by the date they were created.
 **/
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

/**
 * @param product - The product to get the gallery images for
 * @returns The gallery images for the product
 * @description
 * This method is used to get the gallery images for a product.
 * It will return an empty array if there are no gallery images for the product.
 * The gallery images are sorted by the date they were created.
 **/
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

/**
 * @param product - The product to get the first gallery image for
 * @returns The first gallery image for the product
 * @description
 * This method is used to get the first gallery image for a product.
 * It will return an empty array if there are no gallery images for the product.
 **/
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
