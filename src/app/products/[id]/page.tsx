import Image from "next/image";
import { fetchProducts } from "@/lib/fetchProduct";
import { Badge } from "flowbite-react";
import { FaStar } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";

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
          <div className="mt-2 flex flex-row items-center justify-between gap-2">
            <div>
              <div className="mt-2 flex flex-row items-center gap-2 capitalize">
                <TbCategoryFilled className="text-teal-600 text-lg" />
                {data.category}
              </div>
              <div className="mt-2 flex flex-row items-center gap-2">
                <FaStar className="text-yellow-400 text-lg" />
                <p className="text-lg font-semibold">{data.rating.rate}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {" "}
                  ({data.rating.count} Reviews)
                </p>
              </div>
            </div>

            <Badge className="bg-blue-200 w-fit my-2">
              <p className="text-2xl font-semibold text-blue-600 p-2">
                ${data.price}
              </p>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
