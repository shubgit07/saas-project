"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ConditionalNavbar = () => {
  const pathname = usePathname();
  if (pathname === "/landing") {
    return null;
  }
  return <Navbar />;
};

export default ConditionalNavbar;
