"use client";

import { useCustomSize } from "@/shared/hooks/use-custom-size";
import { UsersWithUpdateTable } from "./users-with-update-table";
import { Input } from "@/shared/ui/input";
import { useState } from "react";
import { UsersForAdminTable } from "./users-for-admin-table";
import { useDebounce } from "use-debounce";

export const AdminPanel = () => {
  const isLess = useCustomSize(1000);
  const [value, setValue] = useState("");

  const [debouncedValue] = useDebounce(value, 500);
  return (
    <div
      className={
        "w-full h-[calc(100vh-60px-8px)] flex gap-1 " +
        `${isLess && " flex-col"}`
      }
    >
      <div
        className={
          "border rounded-xl overflow-auto custom-scrollbar " +
          `${isLess ? " w-full h-[37%] " : " h-full w-1/2"}`
        }
      >
        <UsersWithUpdateTable />
      </div>
      <div
        className={
          "border rounded-xl" +
          `${isLess ? " w-full h-[63%] " : " h-full w-1/2"}`
        }
      >
        <div className="h-1/2 max-h-[50%] w-full flex flex-col gap-1 border-b">
          <Input
            value={value}
            className="py-2 rounded-xl"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Поиск..."
          />
          <div className="flex-grow overflow-auto custom-scrollbar">
            <UsersForAdminTable searchValue={debouncedValue} />
          </div>
        </div>
        <div className="h-1/2 w-full flex items-center justify-center">
          some info...
        </div>
      </div>
    </div>
  );
};
