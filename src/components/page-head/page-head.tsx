import Head from "next/head";

import { Branding } from "@/types";
import { PropsWithChildren } from "react";

const appendPageTitle = ({ fields }: Branding, title?: string) => {
  if (!title) return fields.companyName;
  return `${title} | ${fields.companyName}`;
};

type PageHeadProps = PropsWithChildren<{
  branding: Branding;
  title?: string;
}>;

const PageHead = ({ branding, title, children }: PageHeadProps) => {
  return (
    <Head>
      <title>{appendPageTitle(branding, title)}</title>
      {children}
    </Head>
  );
};

export default PageHead;
