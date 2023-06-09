import Head from "next/head";
import type { PropsWithChildren } from "react";

import type { Branding } from "@/types";

const appendPageTitle = ({ fields }: Branding, title?: string) => {
  if (!title) {
    return fields.companyName;
  }
  return `${title} | ${fields.companyName}`;
};

type PageHeadProps = PropsWithChildren<{
  branding: Branding;
  title?: string;
}>;

const PageHead = ({ branding, title, children }: PageHeadProps) => (
  <Head>
    <title>{appendPageTitle(branding, title)}</title>
    {children}
  </Head>
);

export default PageHead;
