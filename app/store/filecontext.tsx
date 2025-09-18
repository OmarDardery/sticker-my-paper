import { createContext } from "react";

export type FileContextType = {
  file: File | null;
  setFile: (file: File | null) => void;
};

const FileContext = createContext<FileContextType>({
  file: null,
  setFile: () => {},
});

export default FileContext;