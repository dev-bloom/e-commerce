// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type Product = {
  name: string;
  description: string;
  price: number;
  tags: string[];
  stock: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const products: Product[] = [
    {
      name: 'Tiffany Blue',
      description: `Ea culpa est Lorem eiusmod laboris nostrud eiusmod nulla. Sit eiusmod cillum minim magna dolore sit
       esse veniam. Pariatur laboris culpa proident velit laborum irure. Commodo consectetur est anim excepteur incididunt nisi labore.
      Velit ullamco mollit duis labore consectetur dolor consectetur mollit reprehenderit sint est dolore. Proident do Lorem aliqua duis 
      velit laboris. Esse laborum velit pariatur eu ut occaecat tempor irure nisi elit culpa labore duis.`,
      price: 1.99,
      tags: ['rollo', 'magic', 'blue'],
      stock: 1
    },
    {
      name: 'Red',
      description: `Ea culpa est Lorem eiusmod laboris nostrud eiusmod nulla. Sit eiusmod cillum minim magna dolore sit
       esse veniam. Pariatur laboris culpa proident velit laborum irure. Commodo consectetur est anim excepteur incididunt nisi labore.
      Velit ullamco mollit duis labore consectetur dolor consectetur mollit reprehenderit sint est dolore. Proident do Lorem aliqua duis 
      velit laboris. Esse laborum velit pariatur eu ut occaecat tempor irure nisi elit culpa labore duis.`,
      price: 1.99,
      tags: ['rollo', 'magic', 'blue'],
      stock: 0
    },
    {
      name: 'Green',
      description: `Ea culpa est Lorem eiusmod laboris nostrud eiusmod nulla. Sit eiusmod cillum minim magna dolore sit
       esse veniam. Pariatur laboris culpa proident velit laborum irure. Commodo consectetur est anim excepteur incididunt nisi labore.
      Velit ullamco mollit duis labore consectetur dolor consectetur mollit reprehenderit sint est dolore. Proident do Lorem aliqua duis 
      velit laboris. Esse laborum velit pariatur eu ut occaecat tempor irure nisi elit culpa labore duis.`,
      price: 1.99,
      tags: ['rollo', 'magic', 'blue'],
      stock: 10
    },
    {
      name: 'Gold',
      description: `Ea culpa est Lorem eiusmod laboris nostrud eiusmod nulla. Sit eiusmod cillum minim magna dolore sit
       esse veniam. Pariatur laboris culpa proident velit laborum irure. Commodo consectetur est anim excepteur incididunt nisi labore.
      Velit ullamco mollit duis labore consectetur dolor consectetur mollit reprehenderit sint est dolore. Proident do Lorem aliqua duis 
      velit laboris. Esse laborum velit pariatur eu ut occaecat tempor irure nisi elit culpa labore duis.`,
      price: 1.99,
      tags: ['rollo', 'magic', 'blue'],
      stock: 4
    }
  ]
  res.status(200).json(products)
}
