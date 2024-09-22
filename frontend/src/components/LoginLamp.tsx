"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import { LoginForm } from "./LoginForm";


export function LoginLamp() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.9,
          ease: "easeInOut",
        }}
        className="flex mt-72 items-end justify-end top-0  bg-gradient-to-br from-slate-300 to-slate-500  bg-clip-text   "
      >
        <LoginForm/>
      </motion.h1>
    </LampContainer>
  );
}
