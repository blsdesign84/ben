
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Analyse de l'objet en bois...",
  "Calcul de l'éclairage optimal...",
  "Génération de l'arrière-plan...",
  "Harmonisation des ombres...",
  "Sublimation des textures...",
  "Finalisation du packshot haute qualité..."
];

const LoadingState: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 px-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-sm">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-amber-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-amber-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
        </div>
      </div>
      <h3 className="text-xl font-bold text-amber-900 mb-2">Création en cours</h3>
      <p className="text-amber-600 font-medium animate-bounce h-6">
        {MESSAGES[msgIdx]}
      </p>
      <div className="mt-8 w-full max-w-xs bg-amber-100 rounded-full h-1.5 overflow-hidden">
        <div className="bg-amber-600 h-full animate-[progress_20s_ease-in-out_infinite]" style={{ width: '0%' }}></div>
      </div>
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 95%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;
