"use client";

import React from "react";

interface DirectusContentRendererProps {
  htmlContent: string;
}

const DirectusContentRenderer: React.FC<DirectusContentRendererProps> = ({ htmlContent }) => {
  // console.log("htmlContent:", htmlContent);
  return (
    <div
      className="max-w-none text-base text-foreground [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-700"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />

  );
};

export default DirectusContentRenderer;
