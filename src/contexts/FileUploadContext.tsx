import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FileUploadContextType {
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(undefined);

export const FileUploadProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  return (
    <FileUploadContext.Provider value={{ uploadedFile, setUploadedFile }}>
      {children}
    </FileUploadContext.Provider>
  );
};

export const useFileUploadContext = (): FileUploadContextType => {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error('useFileUploadContext must be used within a FileUploadProvider');
  }
  return context;
};
