import type { IconType } from "react-icons";
import { CiGrid42 } from "react-icons/ci";
import { FaBus } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { ImLocation } from "react-icons/im";
import { MdPerson4 } from "react-icons/md";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { RxPeople } from "react-icons/rx";

export type SidebarItem = {
  title: string;
  icon: IconType;
  url: string;
  children?: SidebarItem[];
};

export type sidebarGroupsProps = {
  label?: string;
  items: SidebarItem[];
  index?: number;
};

export const dashboardSidebarContentGroups: sidebarGroupsProps[] = [
  {
    label: "Dashboard",
    items: [
      {
        title: "Dashboard",
        icon: CiGrid42,
        url: "/d",
      },
      {
        title: "Clients",
        icon: RxPeople,
        url: "/d/clients",
      },
      {
        title: "Client Tracking",
        icon: RiCompassDiscoverLine,
        url: "/d/client-tracking",
      },
      {
        title: "Bus Tracking",
        icon: ImLocation,
        url: "/d/bus-tracking",
      },
      {
        title: "Vehicles",
        icon: FaBus,
        url: "/d/vehicles",
      },
      {
        title: "Drivers",
        icon: MdPerson4,
        url: "/d/drivers",
      },
      {
        title: "Payments",
        icon: HiOutlineCurrencyDollar,
        url: "/d/payments",
      },
      {
        title: "Communications",
        icon: FaRegComment,
        url: "/d/communications",
      },
    ],
  },
];
