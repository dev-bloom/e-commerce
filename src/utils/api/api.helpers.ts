import { hoursToSeconds } from "date-fns";
import type { GetServerSidePropsResult, GetStaticPropsResult } from "next";
import type { FC, PropsWithChildren } from "react";

import type { Branding } from "@/types";

import { getBranding } from "./branding.helpers";

const defaultRevalidateDays = 7;

interface GlobalProps {
  branding: Branding;
}

export type PageWithGlobalProps<T> = T & GlobalProps;

export type PageComponentProps<T = {}> = FC<
  PropsWithChildren<PageWithGlobalProps<T>>
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
): Promise<GetStaticPropsResult<PageWithGlobalProps<T>>> => {
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

/**
 * @param pageServerSideProps - The props for the page
 * @param otherOptions - Other options for getServerSideProps
 * @returns The props for the page with the global static props
 * @description
 * This method is used to get the global server side props for a page.
 **/
export const getGlobalServerSideProps = async <T extends object = {}>(
  pageServerSideProps?: T,
  otherOptions?: Omit<GetServerSidePropsResult<T>, "props">
): Promise<GetServerSidePropsResult<PageWithGlobalProps<T>>> => {
  const branding = await getBranding();

  return {
    props: {
      ...(pageServerSideProps as T),
      branding,
    },
    ...otherOptions,
  };
};
