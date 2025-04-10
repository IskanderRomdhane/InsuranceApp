import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Award, ChevronRight, Home, Calendar, Shield, AlertCircle, Users, FileText, Building } from 'lucide-react';

const Agences = () => {
  const [selectedCenter, setSelectedCenter] = useState(0);
  
  const centers = [
    {
      name: "Wiqaya Headquarters",
      address: "2 Rue de Marseille, Tunis 1000",
      phone: "+216 71 123 456",
      email: "info@wiqaya.tn",
      coordinates: {lat: 36.799, lng: 10.181},
      embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.7413845656447!2d10.179615276269805!3d36.80075056766791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd346dfb508437%3A0x63d5ddd1ddfef28d!2s2%20Rue%20de%20Marseille%2C%20Tunis%201001!5e0!3m2!1sen!2stn!4v1740679545927!5m2!1sen!2stn",
      mainOffice: true,
      hours: "Monday - Friday: 8:00 AM - 5:00 PM",
      description: "Our headquarters in the heart of Tunis offers comprehensive insurance services with a team of experienced professionals ready to assist you with all your insurance needs."
    },
    {
      name: "Wiqaya Sousse Center",
      address: "Avenue Hedi Nouira, Sousse 4000",
      phone: "+216 73 234 567",
      email: "sousse@wiqaya.tn",
      embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.5146242390742!2d10.646795176235651!3d35.81184742278706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13027516189605ff%3A0x2029b77ad9a4714c!2sAv.%20Hedi%20Nouira%2C%20Sousse!5e0!3m2!1sen!2stn!4v1740679449952!5m2!1sen!2stn",
      coordinates: {lat: 35.825, lng: 10.637},
      hours: "Monday - Friday: 8:30 AM - 4:30 PM",
      description: "Our Sousse branch serves the central coastal region with specialized services in auto and home insurance, offering quick claim processing and personalized consultations."
    },
    {
      name: "Wiqaya Sfax Center",
      address: "Route de Tunis Km 3, Sfax 3000",
      phone: "+216 74 345 678",
      email: "sfax@wiqaya.tn",
      embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52429.63807144247!2d10.714627164439195!3d34.784491404036764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301d3ddb32136a1%3A0x2238e7b90464006!2sroute%20de%20tunis%20km%206!5e0!3m2!1sen!2stn!4v1740679506533!5m2!1sen!2stn",
      coordinates: {lat: 34.744, lng: 10.761},
      hours: "Monday - Friday: 8:00 AM - 5:00 PM",
      description: "Our Sfax office specializes in business and commercial insurance solutions, catering to the industrial and business sectors of southern Tunisia."
    }
  ];

  const services = [
    { name: "Auto Insurance", icon: <Shield className="w-4 h-4 text-green-600" /> },
    { name: "Home Insurance", icon: <Home className="w-4 h-4 text-green-600" /> },
    { name: "Health Insurance", icon: <AlertCircle className="w-4 h-4 text-green-600" /> },
    { name: "Life Insurance", icon: <Users className="w-4 h-4 text-green-600" /> },
    { name: "Claims Processing", icon: <FileText className="w-4 h-4 text-green-600" /> },
    { name: "Insurance Consultations", icon: <Calendar className="w-4 h-4 text-green-600" /> }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}

      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Location List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Our Centers</h2>
              </div>
              
              <div className="space-y-2">
                {centers.map((center, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition duration-200 flex items-center ${
                      selectedCenter === index ? 'bg-green-100 border-l-4 border-green-600' : 'hover:bg-green-50'
                    }`}
                    onClick={() => setSelectedCenter(index)}
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{center.name}</h3>
                      <p className="text-sm text-gray-600">{center.address}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 ${selectedCenter === index ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center mb-4">
                <Award className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">About Us</h2>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                Since 1980, Wiqaya has been a trusted name in insurance across Tunisia, 
                bringing personalized insurance solutions closer to you with multiple locations nationwide.
              </p>
              <div className="bg-green-100 p-3 rounded-lg flex items-center mt-2">
                <Award className="w-8 h-8 text-green-600 mr-3" />
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Tunisia's Top Insurance Provider</span><br />
                  5 consecutive years of excellence
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Map and Details */}
          <div className="lg:col-span-2">
            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="h-80 w-full">
                <iframe 
                  src={centers[selectedCenter].embedMapUrl}
                  width="100%" 
                  height="100%" 
                  style={{border: 0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing ${centers[selectedCenter].name}`}
                ></iframe>
              </div>
            </div>
            
            {/* Selected Center Details */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Building className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{centers[selectedCenter].name}</h2>
                    {centers[selectedCenter].mainOffice && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        Main Office
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mb-5">
                {centers[selectedCenter].description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">Address</h3>
                      <p className="text-gray-600 text-sm">{centers[selectedCenter].address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">Phone</h3>
                      <p className="text-gray-600 text-sm">{centers[selectedCenter].phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">Email</h3>
                      <p className="text-gray-600 text-sm">{centers[selectedCenter].email}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm">Working Hours</h3>
                      <p className="text-gray-600 text-sm">{centers[selectedCenter].hours}</p>
                      <p className="text-gray-600 text-sm">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600 text-sm">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-medium text-gray-800">Services at this location</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center">
                      {service.icon}
                      <p className="text-gray-600 text-sm ml-2">{service.name}</p>
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