import {
  Calendar,
  FileSliders,
  GraduationCap,
  LogIn,
  MessageCircle,
  Search,
  Settings,
  User,
  Users,
  Video,
} from "lucide-react";

export const getSidebarItems = (
  isAuth: boolean,
  tryAuth: boolean,
  isAdmin?: boolean
) => {
  if (tryAuth && !isAuth) return [];
  if (!isAuth && !tryAuth)
    return [{ title: "Log-in", url: "/api/auth/signin", icon: LogIn }];

  if (isAdmin)
    return [
      {
        title: "AdminPanel",
        url: "/admin-panel",
        icon: FileSliders,
      },
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
      {
        title: "Chats",
        url: "/chats",
        icon: MessageCircle,
      },
    ];
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
    {
      title: "Chats",
      url: "/chats",
      icon: MessageCircle,
    },
  ];
};
