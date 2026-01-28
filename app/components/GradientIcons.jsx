"use client";

import React, { useId } from "react";

export default function GradientIcons({ Icon }) {
  const id = useId(); // stable across server + client
  const gradId = `grad-${id}`;

  return (
    <svg width="1rem" height="1rem" className="svg" viewBox="0 0 24 24">
      <defs>
        <linearGradient id={gradId} gradientTransform="rotate(25)">
          <stop offset="0%" stopColor="#ff2d7a" />
          <stop offset="100%" stopColor="#ff6a00" />
        </linearGradient>
      </defs>

      {/* apply the gradient */}
      <Icon style={{ fill: `url(#${gradId})` }} />
    </svg>
  );
}
