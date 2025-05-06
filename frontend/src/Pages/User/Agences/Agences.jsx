import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Award, ChevronRight, Home, Calendar, Shield, AlertCircle, Users, FileText, Building } from 'lucide-react';

const Agences = () => {
  const [selectedCenter, setSelectedCenter] = useState(0);
  
  const centres = [
    {
      nom: "Siège Social Wiqaya",
      adresse: "2 Rue de Marseille, Tunis 1000",
      telephone: "+216 71 123 456",
      email: "contact@wiqaya.tn",
      coordonnees: {lat: 36.799, lng: 10.181},
      carteEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.7413845656447!2d10.179615276269805!3d36.80075056766791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd346dfb508437%3A0x63d5ddd1ddfef28d!2s2%20Rue%20de%20Marseille%2C%20Tunis%201001!5e0!3m2!1sen!2stn!4v1740679545927!5m2!1sen!2stn",
      siegeSocial: true,
      horaires: "Lundi - Vendredi : 8h00 - 17h00",
      description: "Notre siège social au cœur de Tunis propose des services d'assurance complets avec une équipe de professionnels expérimentés prête à répondre à tous vos besoins en assurance."
    },
    {
      nom: "Agence Wiqaya Sousse",
      adresse: "Avenue Hedi Nouira, Sousse 4000",
      telephone: "+216 73 234 567",
      email: "sousse@wiqaya.tn",
      carteEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.5146242390742!2d10.646795176235651!3d35.81184742278706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13027516189605ff%3A0x2029b77ad9a4714c!2sAv.%20Hedi%20Nouira%2C%20Sousse!5e0!3m2!1sen!2stn!4v1740679449952!5m2!1sen!2stn",
      coordonnees: {lat: 35.825, lng: 10.637},
      horaires: "Lundi - Vendredi : 8h30 - 16h30",
      description: "Notre agence de Sousse dessert la région côtière centrale avec des services spécialisés en assurance auto et habitation, offrant un traitement rapide des sinistres et des consultations personnalisées."
    },
    {
      nom: "Agence Wiqaya Sfax",
      adresse: "Route de Tunis Km 3, Sfax 3000",
      telephone: "+216 74 345 678",
      email: "sfax@wiqaya.tn",
      carteEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52429.63807144247!2d10.714627164439195!3d34.784491404036764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d3ddb32136a1%3A0x2238e7b90464006!2sroute%20de%20tunis%20km%206!5e0!3m2!1sen!2stn!4v1740679506533!5m2!1sen!2stn",
      coordonnees: {lat: 34.744, lng: 10.761},
      horaires: "Lundi - Vendredi : 8h00 - 17h00",
      description: "Notre agence de Sfax est spécialisée dans les solutions d'assurance professionnelle et commerciale, répondant aux besoins des secteurs industriels et commerciaux du sud tunisien."
    }
  ];

  const services = [
    { nom: "Assurance Auto", icone: <Shield className="w-5 h-5 text-emerald-600" /> },
    { nom: "Assurance Habitation", icone: <Home className="w-5 h-5 text-emerald-600" /> },
    { nom: "Assurance Santé", icone: <AlertCircle className="w-5 h-5 text-emerald-600" /> },
    { nom: "Assurance Vie", icone: <Users className="w-5 h-5 text-emerald-600" /> },
    { nom: "Traitement des Sinistres", icone: <FileText className="w-5 h-5 text-emerald-600" /> },
    { nom: "Consultations", icone: <Calendar className="w-5 h-5 text-emerald-600" /> }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne Gauche - Liste des agences */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <MapPin className="w-6 h-6 text-emerald-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Nos Agences</h2>
              </div>
              
              <div className="space-y-3">
                {centres.map((centre, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 flex items-between ${
                      selectedCenter === index 
                        ? 'bg-emerald-50 border-l-4 border-emerald-600' 
                        : 'hover:bg-emerald-50/50'
                    }`}
                    onClick={() => setSelectedCenter(index)}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{centre.nom}</h3>
                      <p className="text-sm text-gray-600 mt-1">{centre.adresse}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 ml-2 ${selectedCenter === index ? 'text-emerald-600' : 'text-gray-400'}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Award className="w-6 h-6 text-emerald-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">À Propos</h2>
              </div>
              <p className="text-gray-700 mb-5 text-base leading-relaxed">
                Depuis 1980, Wiqaya est un acteur majeur de l'assurance en Tunisie,
                offrant des solutions personnalisées à travers notre réseau national d'agences.
              </p>
              <div className="bg-emerald-50 p-4 rounded-xl flex items-start border border-emerald-100">
                <Award className="w-8 h-8 text-emerald-600 mr-4 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Leader Tunisien de l'Assurance</p>
                  <p className="text-sm text-gray-600 mt-1">Primé 5 années consécutives</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Colonne Droite - Carte et Détails */}
          <div className="lg:col-span-2 space-y-8">
            {/* Carte */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-96 w-full">
                <iframe 
                  src={centres[selectedCenter].carteEmbed}
                  width="100%" 
                  height="100%" 
                  className="border-0"
                  allowFullScreen
                  loading="lazy" 
                  title={`Carte de ${centres[selectedCenter].nom}`}
                />
              </div>
            </div>
            
            {/* Détails de l'agence */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start">
                  <Building className="w-8 h-8 text-emerald-600 mr-4" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {centres[selectedCenter].nom}
                    </h2>
                    {centres[selectedCenter].siegeSocial && (
                      <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                        Siège Social
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                {centres[selectedCenter].description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-5">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-emerald-600 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                      <p className="text-gray-600">{centres[selectedCenter].adresse}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-emerald-600 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                      <p className="text-gray-600">{centres[selectedCenter].telephone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-emerald-600 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">{centres[selectedCenter].email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-emerald-600 mr-4 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Horaires d'ouverture</h3>
                      <p className="text-gray-600">{centres[selectedCenter].horaires}</p>
                      <p className="text-gray-600">Samedi : 9h00 - 13h00</p>
                      <p className="text-gray-600">Dimanche : Fermé</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-emerald-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Services disponibles</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center bg-emerald-50/50 p-3 rounded-lg">
                      {service.icone}
                      <span className="text-gray-700 ml-3">{service.nom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agences;