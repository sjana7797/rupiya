"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import RupyaLogo from "~/assets/image/rupya-logo.png";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center">
          <Image src={RupyaLogo} alt="Rupya Logo" className="h-14 w-auto" />
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="#" className="text-gray-600 hover:text-blue-600">
            About Us
          </Link>
          <Link href="#" className="text-gray-600 hover:text-blue-600">
            Products
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </Link>
        </nav>
        <Button className="md:hidden" variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}

export default Header;
