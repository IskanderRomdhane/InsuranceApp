import React from 'react'

const DeposerReclamationInfo = () => {
  return (

        <div className="w-full lg:w-2/5 lg:ml-auto">
              <div className="bg-gradient-to-br from-green-700 to-green-900 text-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-green-900 opacity-40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-center px-6 drop-shadow-md">Protection & Sérénité</h2>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Notre engagement</h3>
                    <p className="text-green-100 mb-4">
                      Nous vous offrons une assurance qui s'adapte à vos besoins avec un traitement rapide de vos réclamations. Votre tranquillité d'esprit est notre priorité.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-green-800 bg-opacity-30 rounded-lg">
                      <div className="bg-green-600 p-3 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">Réponse sous 24 heures</h4>
                        <p className="text-green-200 text-sm">Nous valorisons votre temps</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-green-800 bg-opacity-30 rounded-lg">
                      <div className="bg-green-600 p-3 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">Suivi personnalisé</h4>
                        <p className="text-green-200 text-sm">Un conseiller dédié à votre dossier</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-green-800 bg-opacity-30 rounded-lg">
                      <div className="bg-green-600 p-3 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">Protection complète</h4>
                        <p className="text-green-200 text-sm">Des solutions adaptées à chaque situation</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-green-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Assistance immédiate</p>
                        <p className="text-green-200 text-sm">Disponible 24/7 pour vous</p>
                      </div>
                      <button className="bg-white text-green-700 py-2 px-6 rounded-full font-medium hover:bg-green-50 transition duration-300 shadow-lg">
                        Contacter
                      </button>
                    </div>
                  </div>
                </div>

              </div>
        </div>
  )
}

export default DeposerReclamationInfo