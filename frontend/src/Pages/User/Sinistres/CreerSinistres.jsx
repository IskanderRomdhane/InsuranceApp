import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SinistreType from "./FormPages/SinistreType";
import GeneralInformation from "./FormPages/GeneralInformation";
import UploadFiles from "./FormPages/UploadFiles";
import Review from "./FormPages/Review";
import Confirmation from "./FormPages/Confirmation";

const CreerSinistres = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    userId: "502",
    type_sinistre: "",
    objectSinistre: "",
    descriptionSinistre: "",
    amount: "",
    matricule: "",
    location: "",
    propertyAddress: "",
    damageType: "",
    hospitalName: "",
    isCashless: false,
    diagnosis: "",
    image: null,
    document: null,
  });

  const [verify, setVerify] = useState({
    type_sinistre: false,
    objectSinistreVer: false,
    descriptionSinistreVer: false,
    amountVer: false,
    MatriculeVer: false,
    LocationVer: false,
    propertyAddressVer: false,
    damageTypeVer: false,
    hospitalNameVer: false,
    isCashlessVer: false,
    diagnosisVer: false,
  });

  // Validate fields based on current step
  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.type_sinistre) {
          setVerify((prev) => ({ ...prev, type_sinistre: true }));
          return false;
        }
        return true;

      case 2:
        let isValid = true;
        const requiredFields = ["objectSinistre", "descriptionSinistre"];
        for (const field of requiredFields) {
          if (!formData[field]) {
            setVerify((prev) => ({ ...prev, [`${field}Ver`]: true }));
            isValid = false;
          }
        }

        // Type-specific validation
        if (formData.type_sinistre === "automobile") {
          if (!formData.Matricule) {
            setVerify((prev) => ({ ...prev, MatriculeVer: true }));
            isValid = false;
          }
          if (!formData.Location) {
            setVerify((prev) => ({ ...prev, LocationVer: true }));
            isValid = false;
          }
          if (!formData.amount) {
            setVerify((prev) => ({ ...prev, amountVer: true }));
            isValid = false;
          }
        } else if (formData.type_sinistre === "sante") {
          if (!formData.hospitalName) {
            setVerify((prev) => ({ ...prev, hospitalNameVer: true }));
            isValid = false;
          }
          if (!formData.diagnosis) {
            setVerify((prev) => ({ ...prev, diagnosisVer: true }));
            isValid = false;
          }
          if (!formData.amount) {
            setVerify((prev) => ({ ...prev, amountVer: true }));
            isValid = false;
          }
        } else if (formData.type_sinistre === "habilitation") {
          if (!formData.propertyAddress) {
            setVerify((prev) => ({ ...prev, propertyAddressVer: true }));
            isValid = false;
          }
          if (!formData.damageType) {
            setVerify((prev) => ({ ...prev, damageTypeVer: true }));
            isValid = false;
          }
        }

        return isValid;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SinistreType
            formData={formData}
            setFormData={setFormData}
            Verify={verify}
            setVerify={setVerify}
          />
        );
      case 2:
        return (
          <GeneralInformation
            formData={formData}
            setFormData={setFormData}
            Verify={verify}
          />
        );
      case 3:
        return (
          <UploadFiles
            formData={formData}
            setFormData={setFormData}
            Verify={verify}
          />
        );
      case 4:
        return (
          <Review
            formData={formData}
            setFormData={setFormData}
            Verify={verify}
          />
        );
      case 5:
        return (
          <Confirmation
            formData={formData}
            setFormData={setFormData}
            Verify={verify}
          />
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    "Type",
    "Information",
    "Documents",
    "Review",
    "Confirmation",
  ];

  const handleSubmit = async () => {
    let isValid = true;
    const requiredFields = [
      "type_sinistre",
      "objectSinistre",
      "descriptionSinistre",
    ];

    if (formData.type_sinistre === "automobile") {
      requiredFields.push("Matricule", "Location", "amount");
    } else if (formData.type_sinistre === "sante") {
      requiredFields.push("hospitalName", "diagnosis", "amount");
    } else if (formData.type_sinistre === "habilitation") {
      requiredFields.push("propertyAddress", "damageType");
    }
    for (const field of requiredFields) {
      if (!formData[field]) {
        const verifyField = field === "type_sinistre" ? field : `${field}Ver`;
        setVerify((prev) => ({ ...prev, [verifyField]: true }));
        isValid = false;
      }
    }

    if (!isValid) return;

    const reqData = new FormData();

    if (formData.image) reqData.append("image", formData.image);
    if (formData.document) reqData.append("document", formData.document);
    let sinistereData;
    switch (formData.type_sinistre) {
      case "automobile":
        sinistereData = {
          userId: formData.userId,
          type_sinistre: formData.type_sinistre,
          objectSinistre: formData.objectSinistre,
          descriptionSinistre: formData.descriptionSinistre,
          amount: formData.amount,
          Matricule: formData.Matricule,
          Location: formData.Location,
        };
        break;

      case "sante":
        sinistereData = {
          userId: formData.userId,
          type_sinistre: formData.type_sinistre,
          objectSinistre: formData.objectSinistre,
          descriptionSinistre: formData.descriptionSinistre,
          hospitalName: formData.hospitalName,
          isCashless: formData.isCashless,
          diagnosis: formData.diagnosis,
          amount: formData.amount,
        };
        break;

      case "habilitation":
        sinistereData = {
          userId: formData.userId,
          type_sinistre: formData.type_sinistre,
          objectSinistre: formData.objectSinistre,
          descriptionSinistre: formData.descriptionSinistre,
          propertyAddress: formData.propertyAddress,
          damageType: formData.damageType,
        };
        break;

      default:
        console.error("Type de sinistre non reconnu");
        return;
    }

    reqData.append("sinistre", JSON.stringify(sinistereData));

    try {
      let endpoint = "http://localhost:8081/api/sinistre";
      endpoint += `/${formData.type_sinistre}/creersinistre`;

      const response = await fetch(endpoint, {
        method: "POST",
        body: reqData,
      });

      if (response.ok) {
        console.log("Succès :", await response.text());
        setStep(5);
      } else {
        console.error("Erreur lors de l'envoi :", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-[700px] bg-white rounded-lg">
        {/* Progress bar */}
        <div className="relative mt-8 px-10">
          <div className="absolute top-4 left-0 right-5 h-1 bg-gray-200 mx-10 z-0"></div>
          <div
            className="absolute top-4 left-0 h-1 right-5 bg-green-500 mx-10 z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 90}%` }}
          ></div>

          {/* Step indicators */}
          <div className="flex justify-between relative z-10">
            {[...Array(totalSteps)].map((_, index) => {
              const isActive = index + 1 <= step;
              const isCurrentStep = index + 1 === step;

              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center border-2
                    ${
                      isActive
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-white border-gray-300 text-gray-500"
                    }
                    ${isCurrentStep ? "ring-4 ring-green-100" : ""}
                    font-bold text-sm transition-all duration-300
                  `}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      isActive ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {stepTitles[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form content */}
        <div className="p-10 mt-8">
          {renderStep()}

          {/* Error message for type selection */}
          {step === 1 && verify.type_sinistre && (
            <div className="mt-4 text-red-500 text-sm text-center">
              Veuillez sélectionner un type de sinistre avant de continuer
            </div>
          )}

          {/* Navigation buttons */}
          <div className="mt-10 mx-8">
            {step === totalSteps ? (
              <div></div>
            ) : step === totalSteps - 1 ? (
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 text-green-500 bg-white border border-green-500 rounded hover:bg-green-100 transition duration-200 w-[150px] font-bold"
                  onClick={prevStep}
                >
                  Previous
                </button>

                <button
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition duration-200 w-[150px]"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            ) : step > 1 ? (
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 text-green-500 bg-white border border-green-500 rounded hover:bg-green-100 transition duration-200 w-[150px] font-bold"
                  onClick={prevStep}
                >
                  Previous
                </button>

                <button
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition duration-200 w-[150px]"
                  onClick={nextStep}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  className={`px-4 py-2 text-white rounded transition duration-200 w-[150px] 
                    ${
                      formData.type_sinistre
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  onClick={nextStep}
                  disabled={!formData.type_sinistre}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreerSinistres;
