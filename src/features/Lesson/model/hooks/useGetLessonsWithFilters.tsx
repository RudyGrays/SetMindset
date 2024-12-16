"use client";

import { useQuery } from "@tanstack/react-query";
import { getLessonsWithFiltersAction } from "../actions/getLessonsWithFilters";
import { DateRange } from "react-day-picker";

export const useGetLessonsWithFilters = ({
  teacherName,
  subjectId,
  dateRange,
  direction,
  price,
}: {
  teacherName?: string;
  subjectId?: number;
  dateRange?: DateRange;
  direction?: "asc" | "desc";
  price?: number;
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["lessons", teacherName, subjectId, dateRange, direction, price],
    queryFn: async () => {
      return await getLessonsWithFiltersAction({
        teacherName,
        subjectId,
        dateRange,
        direction,
        price,
      });
    },
    enabled: true,
  });

  return {
    lessons: data,
    isLoading,
    error,
  };
};
