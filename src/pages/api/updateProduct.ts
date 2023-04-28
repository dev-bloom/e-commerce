import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sys, fields } = req.body;

  if (sys.contentType.sys.id === "product") {
    const {
      slug: { "en-US": slug },
    } = fields;

    const url = `https://ecommerce.devbloom.com.co/product/${slug}`;
    await fetch(url);

    res.status(200).send("Page rebuild triggered");
  } else {
    res.status(404).send("Entry type not found");
  }
}
