import {
  Calendar,
  GraduationCap,
  LogIn,
  Search,
  Settings,
  User,
  Users,
  Video,
} from "lucide-react";

export const getSidebarItems = (isAuth: boolean, tryAuth: boolean) => {
  if (tryAuth && !isAuth) return [];
  if (!isAuth && !tryAuth)
    return [{ title: "Log in", url: "/api/auth/signin", icon: LogIn }];

  return [
    {
      title: "Lessons",
      url: "/lessons",
      icon: GraduationCap,
    },
    {
      title: "Friends",
      url: "/friends",
      icon: Users,
    },
  ];
};
