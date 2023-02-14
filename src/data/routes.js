import {
  adminsIcon,
  dashboardIcon,
  excelFileIcon,
  questionsIcon,
  uploadsIcon,
  userIcon,
} from "../helpers/icons";
import { AdminRoles } from "./constants";

const pages = [
  {
    name: "Dashboard",
    icon: dashboardIcon("", 17, 17),
    path: "/",
    allowedRoles: [AdminRoles.SUPER_ADMIN, AdminRoles.ADMIN],
  },
  {
    name: "Admins",
    icon: adminsIcon("", 17, 17),
    path: "/admins",
    allowedRoles: [AdminRoles.SUPER_ADMIN],
  },
  {
    name: "Users",
    icon: userIcon("", 17, 17),
    allowedRoles: [AdminRoles.SUPER_ADMIN, AdminRoles.ADMIN],
    subPages: [
      {
        name: "All Users",
        icon: userIcon("", 17, 17),
        path: "/users",
        allowedRoles: [AdminRoles.SUPER_ADMIN, AdminRoles.ADMIN],
      },
      {
        name: "Security Questions",
        icon: questionsIcon("", 17, 17),
        path: "/questions",
        allowedRoles: [AdminRoles.SUPER_ADMIN],
      },
    ],
  },
  {
    name: "Uploads",
    icon: uploadsIcon("", 17, 17),
    allowedRoles: [AdminRoles.SUPER_ADMIN],
    subPages: [
      {
        name: "Sheets",
        icon: excelFileIcon("", 17, 17),
        path: "/sheets",
        allowedRoles: [AdminRoles.SUPER_ADMIN],
      },
    ],
  },
  {
    name: "Category",
    icon: adminsIcon("", 17, 17),
    path: "/category",
    allowedRoles: [AdminRoles.SUPER_ADMIN],
  },
];

export default pages;
