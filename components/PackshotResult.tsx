
import React from 'react';

interface PackshotResultProps {
  imageUrl: string;
  onDownload: () => void;
  onReset: () => void;
}

const PackshotResult: React.FC<PackshotResultProps> = ({ imageUrl, onDownload, onReset }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-6 border border-amber-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
          Packshot Généré
        </h3>
        <button 
          onClick={onReset}
          className="text-amber-600 hover:text-amber-800 text-sm font-medium transition-colors"
        >
          Recommencer
        </button>
      </div>
      
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-inner group">
        <img 
          src={imageUrl} 
          alt="Generated Packshot" 
          className="w-full h-full object-contain"
        />
        <div className="absolute top-2 right-2 flex gap-2">
            <div className="bg-black/50 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md uppercase tracking-wider font-bold">
                HD Ready
            </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onDownload}
          className="flex-1 bg-amber-900 text-amber-50 py-3 rounded-xl font-bold shadow-lg hover:bg-amber-800 transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Télécharger l'image
        </button>
        <button
          onClick={() => {
            const shareData = {
              title: 'Mon Packshot Artisan',
              text: 'Regarde ma nouvelle création artisanale !',
              url: imageUrl
            };
            if (navigator.share) {
              navigator.share(shareData);
            }
          }}
          className="bg-amber-100 text-amber-900 py-3 px-6 rounded-xl font-bold hover:bg-amber-200 transition-all sm:w-auto flex items-center justify-center gap-2"
        >
          Partager
        </button>
      </div>
    </div>
  );
};

export default PackshotResult;
