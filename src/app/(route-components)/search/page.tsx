"use client";

import { useSession } from "next-auth/react";

const Page = () => {
  const { data } = useSession();
  return <div>{data?.user?.name}</div>;
};

export default Page;
