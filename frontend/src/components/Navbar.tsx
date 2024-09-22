'use client'
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


export function NavbarDemo() {

  

  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="bg-black text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    }
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Logout user
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    } else {
      // Redirect to the registration/login page
      router.push('/register');
    }
  };
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/database-schema-visualizer">Database Schema Visualizer</HoveredLink>
            
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Profile">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Profile"
              href=""
              src="/me.png"
              description="Name : XYZ"
            />
            <span onClick={handleAuthClick} className="cursor-pointer" > {isLoggedIn ? 'Logout' : 'Login'}</span>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Visualize your database schema with ease. Our <br/>tool allows you to create and explore complex <br/>database structures effortlessly.</HoveredLink>
            
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar
