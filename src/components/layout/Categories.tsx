import { Category } from "@/app/api/models/categoryModel";
import connectDB from "@/lib/connectDB";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function fetchCategories() {
  "use server";
  try {
    await connectDB();
    const res = await Category.find();
    return { data: res, error: null };
  } catch (error) {
    console.log("Error fetching categories ", error);
    return { data: null, error: true };
  }
}
export async function generateStaticParams() {
  const slugs = await Category.find().select("name");
  console.log({ slugs });
  const slugRoutes = slugs.map((slug) => slug);
  return slugRoutes.map((slug) => ({
    slug,
  }));
}
export default async function Categories() {
  const { data, error } = await fetchCategories();
  if (error) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold text-gray-900'>
          Something went wrong!
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className='grid grid-flow-col gap-6 justify-start overflow-x-auto overflow-y-hidden md:overflow-auto mt-10 p-2 md:p-4'>
        {data.map((category) => {
          return (
            <Link
              href={`/menu/${category.name}`}
              key={category._id}
              className='flex bg-white dark:bg-accent hover:bg-accent/90 transition-all duration-150 p-2 flex-col items-center rounded-xl gap-2 w-28 md:w-40'>
              <div className='rounded-xl p-3'>
                <Image
                  src={category.imageUrl}
                  width={80}
                  height={80}
                  objectFit='contain'
                  alt='burgers'
                />
              </div>
              <div className='text-sm flex flex-col leading-5 items-center gap-3'>
                <div>
                  <div className='font-medium text-xs md:text-sm text-center line-clamp-3'>
                    {category.name}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
