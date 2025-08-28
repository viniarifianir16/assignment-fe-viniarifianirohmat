"use client";

import { Product } from "@/lib/fetchProduct";
import { Badge, Card } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  data: Product[];
};

export function ProductCard({ data }: ProductCardProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((items) => (
        <Link key={items.id} href={`/products/${items.id}`}>
          <Card
            className="w-auto h-full flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-400 dark:hover:shadow-gray-700"
            renderImage={() => (
              <div className="h-52 w-full flex items-center justify-center bg-white">
                <Image
                  width={500}
                  height={500}
                  src={items.image || "/default.png"}
                  alt={items.title}
                  className="object-contain h-50 max-w-full p-4"
                />
              </div>
            )}
          >
            <div className="flex flex-col flex-grow justify-between gap-2">
              <h2 className="tracking-tight text-gray-900 dark:text-white line-clamp-3">
                {items.title}
              </h2>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                <p className="capitalize text-gray-700 dark:text-gray-400">
                  {items.category}
                </p>
                <Badge className="bg-blue-200 w-fit mt-2 lg:block">
                  <h2 className="font-semibold text-blue-600 p-2">
                    ${items.price}
                  </h2>
                </Badge>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
