
"use client";

import React from 'react';
import Image from 'next/image';

const FloatingActionButton: React.FC = () => {
  const handleClick = () => {
    // Placeholder action
    console.log("Floating action button clicked!");
    // You can replace this with actual functionality,
    // e.g., opening a chat modal, navigating, etc.
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 rounded-full shadow-2xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-opacity duration-200 ease-in-out group bg-card"
      aria-label="Floating Action Button"
    >
      <div className="w-14 h-14 relative overflow-hidden rounded-full"> {/* Explicit dimensions and relative for Image fill */}
        {/* 
          To use your specific icon image (like the one you provided):
          1. Save your icon image (e.g., my-fab-icon.png) in the `public` folder of your project.
          2. Update the src attribute below: src="/my-fab-icon.png" (or the correct path to your image)
          3. Ensure the width (w-14) and height (h-14) of this button match your icon's desired display size,
             or adjust the Image component's styling and objectFit property.
        */}
        <Image
          src="https://placehold.co/56x56.png" 
          alt="Floating Action Button Icon"
          fill
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-200 ease-in-out rounded-full" // Ensure image itself is rounded
          data-ai-hint="glowing orb" // Hint for replacing the placeholder with an actual image
        />
      </div>
    </button>
  );
};

export default FloatingActionButton;
