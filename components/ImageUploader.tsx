
import React, { useCallback } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, currentImage }) => {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelected]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-amber-900 mb-2">
        1. Importez votre objet
      </label>
      <div 
        className={`relative border-2 border-dashed rounded-xl transition-all h-64 flex items-center justify-center overflow-hidden
          ${currentImage ? 'border-amber-400' : 'border-amber-200 hover:border-amber-400 bg-amber-50/30'}`}
      >
        {currentImage ? (
          <div className="relative w-full h-full group">
            <img 
              src={currentImage} 
              alt="Preview" 
              className="w-full h-full object-contain p-4"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => (document.getElementById('fileInput') as HTMLInputElement).click()}
                className="bg-white text-amber-900 px-4 py-2 rounded-full font-medium text-sm shadow-lg transform hover:scale-105 transition-transform"
              >
                Changer d'image
              </button>
            </div>
          </div>
        ) : (
          <div 
            className="text-center p-6 cursor-pointer"
            onClick={() => (document.getElementById('fileInput') as HTMLInputElement).click()}
          >
            <div className="mb-4 inline-block p-4 bg-amber-100 rounded-full text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-amber-800 font-medium">Cliquez pour ajouter une photo</p>
            <p className="text-amber-600 text-sm mt-1">Formats acceptés : JPG, PNG (Max 5MB)</p>
          </div>
        )}
        <input 
          id="fileInput"
          type="file" 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
