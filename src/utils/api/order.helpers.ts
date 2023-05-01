import { EntriesQueries } from "contentful";

import contentfulClient from "../contentfulClient";
import { Order, OrderSkeleton } from "@/types";

/**
 * @param order - The order to get the order items for
 * @returns The order items for the order
 * @description
 * This method is used to get the order items for an order.
 * It will return an empty array if there are no order items.
 **/
export const getOrderItems = async (order: Order): Promise<Order[]> => {
  if (!order.fields.orderItems?.length) {
    return [];
  }
  const orderItemsResponse =
    await contentfulClient.withoutLinkResolution.getEntries<OrderSkeleton>({
      content_type: "orderItem",
      "sys.id[in]": order.fields.orderItems.map(
        (orderItem) => orderItem.sys.id
      ),
    } as EntriesQueries<OrderSkeleton, undefined>);
  return orderItemsResponse.items;
};

/**
 * @param orderId - The id of the order to get
 * @returns The order with the given id
 * @description
 * This method is used to get an order by its id.
 * It will return null if there is no order with the given id.
 **/
export const getOrder = async (orderId: string): Promise<Order | null> => {
  const orders = await contentfulClient.getEntries<OrderSkeleton>({
    content_type: "order",
    "fields.orderId": orderId,
    limit: 1,
  } as EntriesQueries<OrderSkeleton, undefined>);
  const order: Order = orders.items[0];
  if (!order) {
    return null;
  }

  const [orderItems] = await Promise.all([getOrderItems(order)]);

  return {
    ...order,
    fields: {
      ...order.fields,
      orderItems,
    },
  };
};
