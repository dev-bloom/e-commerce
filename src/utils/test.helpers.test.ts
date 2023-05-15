// Tests for test.helpers.ts

import { getMockDocument, getMockAssetImage } from "./test.helpers";

describe("test.helpers.ts", () => {
  describe("getMockDocument", () => {
    it("should return a mock document", () => {
      const mockDocument = getMockDocument();
      expect(mockDocument).toEqual({
        nodeType: "document",
        data: {},
        content: [],
      });
    });

    it("should return a mock document with the given values", () => {
      const mockDocument = getMockDocument(["test1", "test2"]);
      expect(mockDocument).toEqual({
        nodeType: "document",
        data: {},
        content: [
          {
            nodeType: "paragraph",
            data: {},
            content: [
              {
                nodeType: "text",
                value: "test1",
                marks: [],
                data: {},
              },
            ],
          },
          {
            nodeType: "paragraph",
            data: {},
            content: [
              {
                nodeType: "text",
                value: "test2",
                marks: [],
                data: {},
              },
            ],
          },
        ],
      });
    });
  });

  describe("getMockAssetImage", () => {
    it("should return a mock asset image", () => {
      const mockAssetImage = getMockAssetImage();
      expect(mockAssetImage).toEqual({
        sys: {
          type: "Asset",
          id: "assetId",
          createdAt: "2021-05-02T15:00:00.000Z",
          updatedAt: "2021-05-02T15:00:00.000Z",
          revision: 1,
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "spaceId",
            },
          },
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
        },
        fields: {
          title: "Image",
          description: "Image",
          file: {
            url: expect.any(String),
            details: {
              size: 100,
              image: {
                width: 100,
                height: 100,
              },
            },
            fileName: "image.png",
            contentType: "image/png",
          },
        },
        metadata: {
          tags: [],
        },
      });
    });

    it("should return a mock asset image with the given url", () => {
      const mockAssetImage = getMockAssetImage("test");
      expect(mockAssetImage).toEqual({
        sys: {
          type: "Asset",
          id: "assetId",
          createdAt: "2021-05-02T15:00:00.000Z",
          updatedAt: "2021-05-02T15:00:00.000Z",
          revision: 1,
          space: {
            sys: {
              type: "Link",
              linkType: "Space",
              id: "spaceId",
            },
          },
          environment: {
            sys: {
              id: "master",
              type: "Link",
              linkType: "Environment",
            },
          },
        },
        fields: {
          title: "Image",
          description: "Image",
          file: {
            url: "test",
            details: {
              size: 100,
              image: {
                width: 100,
                height: 100,
              },
            },
            fileName: "image.png",
            contentType: "image/png",
          },
        },
        metadata: {
          tags: [],
        },
      });
    });
  });
});
