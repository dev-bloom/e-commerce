import React from 'react';
import Layout from "@/components/layout/layout";
import type { PageComponentProps } from "@/utils/api/api.helpers";
import { getGlobalStaticProps } from "@/utils/api/api.helpers";
import PageHead from "@/components/page-head/page-head";
import OrderListScreen from '@/components/page-components/order-list-screen/order-list-screen';

export async function getStaticProps() {
    return getGlobalStaticProps();
}

type OrderProps = PageComponentProps;


const Order: OrderProps = ({ branding }) => {
    return (
        <Layout branding={branding}>
            <PageHead branding={branding}></PageHead>
            <OrderListScreen />
        </Layout>
    )
}

export default Order;