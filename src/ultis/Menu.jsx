import Icons from "./Icons"; // src\ultis\Icons.jsx
const { MdLibraryMusic } = Icons;
export const SidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icon: <MdLibraryMusic size={24} />,
  },
  {
    path: "",
    text: "Khám phá",
    end: "true",
    icon: <MdLibraryMusic size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    end: "true",
    icon: <MdLibraryMusic size={24} />,
  },
  {
    path: "follow",
    text: "Theo dõi",
    end: "true",
    icon: <MdLibraryMusic size={24} />,
  },
];
