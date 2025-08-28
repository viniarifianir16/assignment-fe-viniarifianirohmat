import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { MdMessage } from "react-icons/md";

export function Header() {
  return (
    <Navbar
      fluid
      rounded
      className="fixed w-full z-99 top-0 p-5 shadow shadow-gray-300 dark:shadow-gray-600"
    >
      <NavbarBrand as={Link} href="#">
        <Image
          src="/vercel.svg"
          height={200}
          width={200}
          className="mr-3 h-6 sm:h-9 bg-black w-fit"
          alt="Logo"
        />
        <h1 className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Products
        </h1>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        {/* <NavbarLink
          href="#"
          className="flex flex-row items-center gap-2"
          active
        >
          Home
        </NavbarLink> */}
        <NavbarLink href="#" className="flex flex-row items-center gap-2">
          <FaShoppingCart className="text-lg" />
          Cart
        </NavbarLink>
        <NavbarLink href="#" className="flex flex-row items-center gap-2">
          <IoMdNotifications className="text-lg" />
          Notification
        </NavbarLink>
        <NavbarLink href="#" className="flex flex-row items-center gap-2">
          <MdMessage className="text-lg" />
          Message
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
