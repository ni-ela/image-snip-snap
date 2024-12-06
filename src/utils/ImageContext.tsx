import React, { createContext, useContext, useState, ReactNode } from "react";

import localImage from "@/../public/sobre-a-mesa.png";
export const defaultSrc = localImage.src;

interface ImageContextProps {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  cropData: string;
  setCropData: React.Dispatch<React.SetStateAction<string>>;
  newImage: string;
  setNewImage: React.Dispatch<React.SetStateAction<string>>;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [image, setImage] = useState<string>(defaultSrc);
  const [newImage, setNewImage] = useState<string>("");
  const [cropData, setCropData] = useState<string>("");

  return (
    <ImageContext.Provider value={{ image, setImage, newImage, setNewImage, cropData, setCropData }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = (): ImageContextProps => {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error("Contexto de imagem não encontrado");
  }

  return context;
};
