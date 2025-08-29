"use client";

import { ProductCard } from "@/components/card/ProductCard";
import { Container } from "@/components/layout/Container";
import { fetchProducts, Product } from "@/lib/fetchProduct";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdFilterAlt } from "react-icons/md";
import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Search Product
  const handleSearch = (value: string) => {
    setSearch(value);
    setFilterLoading(true);

    setTimeout(() => {
      setFilterLoading(false);
    }, 600);
  };

  // Handle Filter
  const handleFilter = (
    cat?: string,
    min?: number | null,
    max?: number | null
  ) => {
    if (cat !== undefined) {
      if (cat === "All") {
        setCategoriesSelected([]);
      } else {
        setCategoriesSelected((prev) => {
          const newCats = prev.includes(cat)
            ? prev.filter((c) => c !== cat)
            : [...prev, cat];
          return newCats;
        });
      }
    }

    if (min !== undefined) {
      setMinPrice(min === null ? null : min);
    }
    if (max !== undefined) {
      setMaxPrice(max === null ? null : max);
    }
  };

  // List Category
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter + Sort Products
  const filteredProducts = products
    .filter((p) => {
      const matchCategory =
        categoriesSelected.length > 0
          ? categoriesSelected.includes(p.category)
          : true;

      const matchMin = minPrice !== null ? Number(p.price) >= minPrice : true;
      const matchMax = maxPrice !== null ? Number(p.price) <= maxPrice : true;

      const matchSearch = search
        ? p.title.toLowerCase().includes(search.toLowerCase())
        : true;

      return matchCategory && matchMin && matchMax && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "asc") return Number(a.price) - Number(b.price);
      if (sortBy === "desc") return Number(b.price) - Number(a.price);
      return 0;
    });

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Container>
      {/* <h1 className="text-center">PRODUCTS</h1>
      <hr className="mb-6 mt-3 mx-auto w-28 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 rounded-full border-0" /> */}

      <div className="mb-5 flex flex-col items-end gap-2 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <TextInput
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full lg:w-1/3"
        />

        {/* Filter */}
        <Button
          className="bg-blue-500 w-fit"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter <MdFilterAlt className="ml-2" />
        </Button>

        {/* Sidebar Filter */}
        {showFilter && (
          <Sidebar
            aria-label="Filter Sidebar"
            className="fixed bottom-0 right-0 top-20 shadow-lg shadow-gray-400 w-3/4 lg:w-1/4"
          >
            <SidebarItems>
              <div className="flex flex-row items-center justify-between">
                <h3 className="font-bold">Filter</h3>
                <IoMdClose
                  onClick={() => setShowFilter(!showFilter)}
                  className="text-xl"
                />
              </div>
              <SidebarItemGroup>
                {/* Filter Category */}
                <div className="mb-2 block">
                  <Label htmlFor="category" className="text-md">
                    Category
                  </Label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const isActive =
                      cat === "All"
                        ? categoriesSelected.length === 0
                        : categoriesSelected.includes(cat);

                    return (
                      <Button
                        key={cat}
                        onClick={() => handleFilter(cat)}
                        className={`gap-2 text-sm capitalize ${
                          isActive
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-black"
                        }`}
                      >
                        {cat}
                      </Button>
                    );
                  })}
                </div>

                {/* Sort Price */}
                <div className="mb-2 mt-4 block">
                  <Label htmlFor="sort" className="text-md">
                    Sort Price
                  </Label>
                </div>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mt-2"
                >
                  <option value="default">Default</option>
                  <option value="asc">Harga: Termurah</option>
                  <option value="desc">Harga: Termahal</option>
                </Select>

                {/* Price Range */}
                <div className="mb-2 mt-4 block">
                  <Label htmlFor="range" className="text-md">
                    Price Range
                  </Label>
                </div>
                <div className="flex flex-row items-center gap-2 mt-2">
                  <TextInput
                    type="number"
                    placeholder="0"
                    value={minPrice ?? ""}
                    onChange={(e) =>
                      handleFilter(
                        undefined,
                        e.target.value === "" ? null : Number(e.target.value),
                        undefined
                      )
                    }
                  />
                  <p>-</p>
                  <TextInput
                    type="number"
                    placeholder="Max"
                    value={maxPrice ?? ""}
                    onChange={(e) =>
                      handleFilter(
                        undefined,
                        undefined,
                        e.target.value === "" ? null : Number(e.target.value)
                      )
                    }
                  />
                </div>
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
        )}
      </div>

      {/* Product Card */}
      {filterLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ProductCard data={filteredProducts} />
      )}
    </Container>
  );
}
