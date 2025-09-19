"use client";
import FileContext from "../store/filecontext";
import { sticker } from "../store/filecontext";
import React, { useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const [file, setFile] = useState<sticker[] | null>([]);

  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  );
};

export default ContextProvider;