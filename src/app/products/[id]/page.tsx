import Image from "next/image";
import { fetchProducts } from "@/lib/fetchProduct";
import { Badge } from "flowbite-react";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetail({ params }: Props) {
  const products = await fetchProducts();
  const data = products.find((p) => p.id === Number(params.id));

  if (!data) return <p>Product not found</p>;

  return (
    <div className="max-w-4xl mx mx-auto my-5 p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Image
            src={data.image || "/default.png"}
            alt={data.title}
            width={400}
            height={400}
            className="object-contain dark:bg-white dark:p-5 dark:rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="font-bold">{data.title}</h1>
          <p className="text-gray-700 mt-2 dark:text-white">
            {data.description}
          </p>
          <Badge className="bg-blue-200 w-fit my-2">
            <p className="text-xl font-semibold text-blue-600 p-2">
              ${data.price}
            </p>
          </Badge>
          <p className="mt-2">
            Rating: {data.rating.rate} ({data.rating.count} Reviews)
          </p>
          <p className="mt-2 capitalize">Category: {data.category}</p>
        </div>
      </div>
    </div>
  );
}
