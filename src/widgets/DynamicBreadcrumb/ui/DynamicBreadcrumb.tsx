// components/DynamicBreadcrumb.tsx
"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Slash } from "lucide-react";
import Link from "next/link";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const generateBreadcrumbLinks = () => {
    return pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");

      return (
        <BreadcrumbItem className="gap-0" key={href}>
          <BreadcrumbLink asChild>
            <Link href={href}>
              {segment.charAt(0).toUpperCase() +
                segment.slice(1, segment.length > 15 ? 15 : segment.length) +
                `${segment.length > 15 ? "..." : ""}`}
            </Link>
          </BreadcrumbLink>
          <Slash height={"15px"} />
        </BreadcrumbItem>
      );
    });
  };

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex sm:gap-0">
        <BreadcrumbItem className=" gap-0">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
          <Slash height={"15px"} />
        </BreadcrumbItem>
        {generateBreadcrumbLinks()}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
