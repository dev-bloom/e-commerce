import { useRouter } from "next/router";

import Layout from "@/components/layout/layout";
import PageHead from "@/components/page-head/page-head";
import type { Order } from "@/types";
import type { PageComponentProps } from "@/utils/api/api.helpers";
import { getGlobalServerSideProps } from "@/utils/api/api.helpers";
import { getOrder } from "@/utils/api/order.helpers";

interface OrderServerSideProps {
  order: Order;
}

export const getServerSideProps = async ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  try {
    const order = await getOrder(orderId);

    if (!order) {
      return {
        notFound: true,
      };
    }

    return getGlobalServerSideProps<OrderServerSideProps>({ order });
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

type OrderIdProps = PageComponentProps<{ orderId: string }>;

const OrderId: OrderIdProps = ({ branding }) => {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <Layout branding={branding}>
      <PageHead branding={branding} title={`Track Order #${orderId}`} />
      <div>Order: {orderId}</div>
    </Layout>
  );
};

export default OrderId;
