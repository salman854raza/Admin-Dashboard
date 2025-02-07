"use client";

import { atom } from "jotai";
import { client } from "./sanity/lib/client";
import { useAtom } from "jotai";
import { useEffect } from "react";

// Define the Product interface based on your schema
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  productImage: {
    asset: {
      url: string;
    };
  };
  discountPrice?: number;
  slug: {
    current: string;
  };
  inStock: boolean;
  stock: number;
  colors: string[];
  tags: string[];
  isNew: boolean;
  reviews: number;
}

// Atom to store the products
export const data = atom<Product[]>([]);

const DataFetching = () => {
  const [, setProducts] = useAtom(data);

  useEffect(() => {
    const dataFetching = async () => {
      try {
        // Update the GROQ query to match your schema (`productss`)
        const query = `*[_type == "productss"]{
          _id,
          title,
          description,
          price,
          "productImage": productImage.asset->url,
          discountPrice,
          slug,
          inStock,
          stock,
          colors,
          tags,
          isNew,
          reviews
        }`;

        // Fetch products from Sanity
        const fetchedProducts: Product[] = await client.fetch(query);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    dataFetching();
  }, [setProducts]);

  return null;
};

export default DataFetching;