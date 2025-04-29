import { Tag, Sparkles } from "lucide-react";
import React from "react";

export const AdvertisementCard = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">
            Offres spéciales
          </h2>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            Promo
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="font-bold text-base text-blue-800">
                Économisez 15%
              </h3>
              <p className="text-blue-700 text-sm mt-1">
                Sur votre assurance auto en souscrivant avant le 30 juin
              </p>
              <button className="mt-4 text-sm font-medium text-white bg-blue-600 px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                Découvrir l'offre
              </button>
            </div>
            <div className="ml-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Tag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-3 -bottom-3 opacity-10 pointer-events-none">
            <Sparkles className="h-20 w-20 text-blue-800" />
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 flex items-center">
          <span className="inline-block w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
          <span>Offre soumise à conditions</span>
        </div>
      </div>
    </div>
  );
};
