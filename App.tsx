
import React, { useState, useCallback } from 'react';
import { AppStatus, PackshotStyle } from './types';
import { PACKSHOT_STYLES } from './constants';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import PackshotResult from './components/PackshotResult';
import LoadingState from './components/LoadingState';
import { generatePackshot } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [originalImage, setOriginalImage] = useState<string | undefined>();
  const [selectedStyle, setSelectedStyle] = useState<PackshotStyle>(PACKSHOT_STYLES[0]);
  const [resultImage, setResultImage] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const handleGenerate = async () => {
    if (!originalImage) {
      setError("Veuillez d'abord importer une image de votre objet.");
      return;
    }

    setStatus(AppStatus.GENERATING);
    setError(undefined);

    try {
      const result = await generatePackshot(originalImage, selectedStyle.prompt);
      setResultImage(result);
      setStatus(AppStatus.SUCCESS);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la génération. Veuillez réessayer.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `artisan-packshot-${selectedStyle.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setStatus(AppStatus.IDLE);
    setResultImage(undefined);
    setError(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-amber-100 py-6 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-900 rounded-lg flex items-center justify-center text-amber-50 shadow-lg rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-serif text-amber-900 tracking-tight">ArtisanPackshot <span className="text-amber-600 font-sans text-sm font-bold uppercase tracking-widest ml-1">Studio</span></h1>
          </div>
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="hidden md:block text-xs text-amber-500 hover:text-amber-700 underline font-medium">
            Facturation Gemini API
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-amber-950 mb-4">Mettez en valeur votre savoir-faire</h2>
            <p className="text-amber-800/80 max-w-xl mx-auto text-lg leading-relaxed">
                Transformez vos photos brutes en visuels de catalogue professionnels. Spécialement conçu pour les créateurs d'objets en bois.
            </p>
        </div>

        {status === AppStatus.GENERATING ? (
          <LoadingState />
        ) : status === AppStatus.SUCCESS && resultImage ? (
          <PackshotResult 
            imageUrl={resultImage} 
            onDownload={handleDownload}
            onReset={handleReset}
          />
        ) : (
          <div className="space-y-8 bg-white/50 backdrop-blur-sm p-6 md:p-10 rounded-3xl border border-amber-100 shadow-xl">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <ImageUploader 
              onImageSelected={setOriginalImage}
              currentImage={originalImage}
            />

            <StyleSelector 
              selectedStyle={selectedStyle}
              onStyleChange={setSelectedStyle}
            />

            <div className="pt-4">
                <button
                onClick={handleGenerate}
                // Fix: Removed status === AppStatus.GENERATING check as it is unreachable in this block due to conditional rendering narrowing
                disabled={!originalImage}
                className={`w-full py-4 rounded-2xl text-xl font-bold shadow-xl transition-all flex items-center justify-center gap-3
                    ${!originalImage 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-amber-900 text-amber-50 hover:bg-amber-800 active:scale-95'}`}
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Générer mon packshot
                </button>
                <p className="text-center mt-4 text-xs text-amber-600 font-medium">
                    Propulsé par Gemini AI • Haute Résolution
                </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 bg-amber-950 text-amber-100/50 text-sm mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2024 ArtisanPackshot Studio - Outil pour créateurs indépendants.</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Qualité Studio</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> 100% Bois Focus</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> IA Générative</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
