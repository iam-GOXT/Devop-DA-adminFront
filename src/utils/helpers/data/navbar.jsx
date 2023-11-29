import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { SiPocketcasts } from "react-icons/si";

export const NavBarOptions = () => {
  const items = [
    {
      label: "Overview",
      icon: <SiPocketcasts size={20} />,
      target: "/dashboard",
    },
    {
      label: "Uploaded",
      icon: <AiOutlineCloudUpload size={20} />,
      target: "/dashboard/uploads",
    },
    {
      label: "Draft",
      icon: <BsPencilSquare size={20} />,
      target: "/dashboard/draft",
    },
    {
      label: "Manage",
      icon: <AiFillSetting size={20} />,
      target: "/dashboard/manage",
    },
    {
      label: "Trash",
      icon: <BsTrashFill size={20} />,
      target: "/dashboard/trash",
    },
  ];
  return items;
};
