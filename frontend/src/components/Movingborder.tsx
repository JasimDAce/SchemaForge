"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/moving-border";
import Link from "next/link";
import { useRouter } from "next/navigation";


export function Movingborder() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  // Handle the button click based on login status
  const handleButtonClick = () => {
    if (isLoggedIn) {
      // If logged in, navigate to the main component
      router.push("/database-schema-visualizer");
    } else {
      // If not logged in, navigate to the registration page
      router.push("/register");
    }
  };
  return ( 
      <Button
        onClick={handleButtonClick}
        borderRadius="1.75rem"
        className="bg-black text-white border-slate-800 "
      >
        Get Started.
      </Button>
  );
}
