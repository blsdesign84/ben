
import React from 'react';
import { PACKSHOT_STYLES } from '../constants';
import { PackshotStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: PackshotStyle;
  onStyleChange: (style: PackshotStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-amber-900 mb-2">
        2. Choisissez une ambiance
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {PACKSHOT_STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style)}
            className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all overflow-hidden group
              ${selectedStyle.id === style.id 
                ? 'border-amber-600 bg-amber-50 ring-2 ring-amber-600 ring-offset-1' 
                : 'border-transparent bg-white hover:border-amber-200 shadow-sm hover:shadow-md'}`}
          >
            <div className="w-full aspect-square rounded-lg mb-2 overflow-hidden bg-gray-100">
              <img 
                src={style.thumbnail} 
                alt={style.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <span className="text-xs font-semibold text-amber-900 truncate w-full text-center">
              {style.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
