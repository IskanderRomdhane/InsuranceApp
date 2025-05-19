export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

export const StatusIndicator = ({ status }) => {
    const statusConfig = {
      "ACCEPTED": {
        color: "bg-green-500",
        label: "Accepted"
      },
      "PENDING": {
        color: "bg-yellow-500",
        label: "Pending"
      },
      "REJECTED": {
        color: "bg-red-500",
        label: "Rejected"
      },
      "UNDER_REVIEW": {
        color: "bg-blue-500",
        label: "Under Review"
      },
      "FINISHED":{
        color: "bg-blue-500",
        label: "FINISHED"
      }
    };
    
    const config = statusConfig[status] || { color: "bg-gray-500", label: status?.replace("_", " ") || "Unknown" };
    
    return (
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full ${config.color} mr-2`}></div>
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
  };


export const cardLayoutStyles = {
    actionColumn: "w-full md:w-auto flex items-center justify-between",
    statusColumnWidth: "w-32",
    amountColumnWidth: "w-36"
  };