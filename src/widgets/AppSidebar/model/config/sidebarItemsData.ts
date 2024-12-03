import { Calendar, LogIn, Search, Settings, User } from "lucide-react";

export const getSidebarItems = (isAuth: boolean) => {
  if (!isAuth)
    return [{ title: "Log in", url: "/api/auth/signin", icon: LogIn }];

  return [
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];
};
