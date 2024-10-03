"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  image: string;
}

export const TeamSection = ({ people }: { people: TeamMember[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
      {people.map((person) => (
        <motion.div
          key={person.id}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative h-40 sm:h-60 w-full overflow-hidden rounded-lg">
            <Image
              src={person.image}
              alt={person.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="mt-2 sm:mt-4">
            <h3 className="text-base sm:text-lg font-semibold">{person.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{person.designation}</p>
          </div>
          <div className="absolute inset-0 rounded-lg bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-40" />
        </motion.div>
      ))}
    </div>
  );
};