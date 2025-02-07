"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import DynamicButton from "../dynamic-button";
import { Input } from "../ui/input";

const AdminSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [queryValue, setQueryValue] = React.useState(
    searchParams.get("query") || ""
  );

  const formActionUrl = pathname.includes("/admin/orders")
    ? "/admin/orders"
    : pathname.includes("/admin/orders")
      ? "/admin/orders"
      : pathname.includes("/admin/users")
        ? "/admin/users"
        : "/admin/products";

  useEffect(() => {
    setQueryValue(searchParams.get("query") || "");
  }, [searchParams]);

  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        placeholder="Search..."
        name="query"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className="md:w-[100px] lg:w-[300px]"
      />
      <DynamicButton className="sr-only">Search</DynamicButton>
    </form>
  );
};

export default AdminSearch;
