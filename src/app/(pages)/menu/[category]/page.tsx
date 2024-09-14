import React, { Suspense } from "react";
import Categories from "@/components/layout/Categories";
import Loading from "@/components/layout/Loading";
import Products from "@/app/(pages)/menu/[category]/components/Products";

export default async function page({
  params,
}: {
  params: { category: string };
}) {
  let decodedParam = decodeURI(params.category);
  return (
    <>
      <Categories />
      <Suspense fallback={<Loading />}>
        <Products newParam={decodedParam} />
      </Suspense>
    </>
  );
}
