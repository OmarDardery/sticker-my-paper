import { createContext } from "react";

export type sticker = {
  file: File | null;
  desiredDimension: string;
  size: number;
  nwh: { width: number; height: number };
  amount: number;
}


export type FileContextType = {
  file: sticker[] | null;
  setFile: React.Dispatch<React.SetStateAction<sticker[] | null>>;
};

const FileContext = createContext<FileContextType>({
  file: [],
  setFile: () => {},
});

export default FileContext;