"use server";

import { DateRange } from "react-day-picker";
import { getLessonsWithFilters } from "../repo/repo";

export const getLessonsWithFiltersAction = async (data: {
  teacherName?: string;
  subjectId?: number;
  dateRange?: DateRange;
  direction?: "asc" | "desc";
  price?: number;
}) => {
  return await getLessonsWithFilters(data);
};
