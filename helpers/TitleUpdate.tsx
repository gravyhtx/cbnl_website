"use client";

import { useEffect } from "react";

const TitleUpdate = ({ title }: { title: string }) => {
   useEffect(() => {
      document.title = title;
   });

   return null;
};

export default TitleUpdate;

// EXAMPLE
// <TitleUpdate title={title} />