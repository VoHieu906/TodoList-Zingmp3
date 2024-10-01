import Icons from "./Icons"; // src\ultis\Icons.jsx
const { MdLibraryMusic, MdExplore, RiUserFollowFill, MdInsertChart } = Icons;
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
    icon: <MdExplore size={24} />,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    end: "true",
    icon: <MdInsertChart size={24} />,
  },
  {
    path: "follow",
    text: "Theo dõi",
    end: "true",
    icon: <RiUserFollowFill size={24} />,
  },
];
export const SearchMenu = [
  {
    path: "tat-ca",
    text: "TẤT CẢ",
  },
  {
    path: "bai-hat",
    text: "BÀI HÁT",
  },
  {
    path: "playlist",
    text: "PLAYLIST/ALBUM",
  },
  // {
  //   path: "follow",
  //   text: "Theo dõi",
  //   end: "true",
  //   icon: <RiUserFollowFill size={24} />,
  // },
];
