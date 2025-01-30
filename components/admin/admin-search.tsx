"use client";

import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

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
      <Button className="sr-only" type="submit">
        Search
      </Button>
    </form>
  );
};

export default AdminSearch;
