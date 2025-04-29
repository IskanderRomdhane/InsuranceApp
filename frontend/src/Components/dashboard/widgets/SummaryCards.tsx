import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API calls
import {
  ShieldCheckIcon,
  FilesIcon,
  AlertTriangleIcon,
  DollarSignIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import HealthInsurance from "../../../assets/Insurance Types/HealthInsurance.jpg";
import CarInsurance from "../../../assets/Insurance Types/CarInsurance.jpg";
import House from "../../../assets/Insurance Types/House.jpg";

export const SummaryCards = () => {
  const [santeCount, setSanteCount] = useState(0); // State to store the count
  const [AutoCount, setAutoCount] = useState(0);
  const [HouseCount, setHouseCount] = useState(0);

  useEffect(() => {
    // Fetch the count from the backend API
    axios
      .get("http://localhost:8081/api/sinistre/sante")
      .then((response) => {
        setSanteCount(response.data.length); // Assuming the response is an array
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []); // Empty array means this effect runs only once after the initial render

  useEffect(() => {
    // Fetch the count from the backend API
    axios
      .get("http://localhost:8081/api/sinistre/automobile")
      .then((response) => {
        setAutoCount(response.data.length); // Assuming the response is an array
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  useEffect(() => {
    // Fetch the count from the backend API
    axios
      .get("http://localhost:8081/api/sinistre/habilitation")
      .then((response) => {
        setHouseCount(response.data.length); // Assuming the response is an array
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Link to="/sinistres/consulter" state={{ typeFiltre: "Sante" }}>
        <SummaryCard
          title="Assurance Sante"
          value={santeCount}
          change=""
          icon={<ShieldCheckIcon className="h-6 w-6 text-blue-600" />}
          color="blue"
          image={HealthInsurance}
          typeFiltre="Sante"
        />
      </Link>
      <Link to="/sinistres/consulter" state={{ typeFiltre: "AutoMobile" }}>
        <SummaryCard
          title="Assurance Auto"
          value={AutoCount}
          change=""
          icon={<FilesIcon className="h-6 w-6 text-indigo-600" />}
          color="indigo"
          image={CarInsurance}
          typeFiltre="AutoMobile"
        />
      </Link>
      <Link to="/sinistres/consulter" state={{ typeFiltre: "Habilitation" }}>
        <SummaryCard
          title="Assurance Habitation"
          value={HouseCount}
          change=""
          icon={<AlertTriangleIcon className="h-6 w-6 text-amber-600" />}
          color="amber"
          image={House}
          typeFiltre="Habilitation"
        />
      </Link>
    </div>
  );
};

const SummaryCard = ({
  title,
  value,
  change,
  icon,
  color,
  image,
  typeFiltre,
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-green-50 text-green-600",
  };

  const overlayClasses = {
    blue: "bg-blue-900/50",
    indigo: "bg-indigo-900/50",
    amber: "bg-amber-900/50",
    green: "bg-green-900/50",
  };

  return (
    <div className="bg-white relative rounded-lg shadow-sm border border-gray-200 p-5">
      {/* Background image */}
      <img
        src={image}
        alt="Insurance background"
        className="absolute inset-0 w-full h-full object-cover z-0 rounded-lg"
      />

      {/* Overlay div - using color from overlayClasses */}
      <div
        className={`absolute inset-0 ${overlayClasses[color]} z-[1] rounded-lg`}
      ></div>

      {/* Content */}
      <div className="flex justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          <p className="mt-1 text-xs text-gray-100">{change}</p>
        </div>
      </div>
    </div>
  );
};
