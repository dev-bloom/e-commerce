import type { ContentFulEntry } from "./global.types";

export type OrderFields = {
  orderId: string;
  orderItems: ContentFulEntry<OrderFields>[];
};

export type OrderSkeleton = {
  fields: OrderFields;
  contentTypeId: "order";
};

export type Order = ContentFulEntry<OrderFields>;
