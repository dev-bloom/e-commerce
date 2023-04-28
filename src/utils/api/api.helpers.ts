import { GetStaticPropsResult } from "next";
import { hoursToSeconds } from "date-fns";

import { getBranding } from "./branding.helpers";

import { Branding } from "@/types";
import { FC, PropsWithChildren } from "react";

const defaultRevalidateDays = 7;

interface GlobalStaticProps {
  branding: Branding;
}

export type PagePropsWithGlobalStaticProps<T> = T & GlobalStaticProps;

export type PageComponentProps<T = {}> = FC<
  PropsWithChildren<PagePropsWithGlobalStaticProps<T>>
>;

// Generate method documentation from the JSDoc comments
/**
 * @param pageStaticProps - The props for the page
 * @param otherOptions - Other options for getStaticProps
 * @returns The props for the page with the global static props
 * @description
 * This method is used to get the global static props for a page.
 **/
export const getGlobalStaticProps = async <T extends object = {}>(
  pageStaticProps?: T,
  otherOptions?: Omit<GetStaticPropsResult<T>, "props">
): Promise<GetStaticPropsResult<PagePropsWithGlobalStaticProps<T>>> => {
  const branding = await getBranding();

  return {
    props: {
      ...(pageStaticProps as T),
      branding,
    },
    revalidate: hoursToSeconds(24 * defaultRevalidateDays),
    ...otherOptions,
  };
};
