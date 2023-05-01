import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import PageHead from "./page-head";

import { getMockBranding } from "@/utils/test.helpers";

import { Branding } from "@/types";
import { PropsWithChildren } from "react";

jest.mock("next/head", () => {
  return {
    __esModule: true,
    default: ({ children }: PropsWithChildren<{}>) => <div>{children}</div>,
  };
});

describe("PageHead", () => {
  let mockBranding: Branding;

  beforeAll(() => {
    mockBranding = getMockBranding();
  });

  it("renders the company name as the title when no title prop is provided", () => {
    render(<PageHead branding={mockBranding} />);
    const titleElement = screen.getByText(mockBranding.fields.companyName);
    expect(titleElement).toBeInTheDocument();
  });

  it("appends the company name to the title prop when provided", async () => {
    const title = "Product List";
    const expectedTitle = `${title} | ${mockBranding.fields.companyName}`;
    render(<PageHead branding={mockBranding} title={title} />);
    const titleElement = screen.getByText(expectedTitle);
    expect(titleElement).toBeInTheDocument();
  });
});
