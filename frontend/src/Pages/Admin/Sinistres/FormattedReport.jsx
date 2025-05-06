import React from 'react';

const FormattedReport = ({ aiReport }) => {
  const formatReport = (report) => {
    const lines = report.split('\n').filter(line => line.trim() !== '');
    const formattedLines = lines.map(line => {
      if (line.startsWith('Claim Report – ID:')) return <p className="font-semibold text-lg text-gray-800">{line}</p>;
      if (line.startsWith('Client:')) return <p className="text-gray-600"><span className="font-medium">Client:</span> {line.replace('Client:', '').trim()}</p>;
      if (line.startsWith('Vehicle:')) return <p className="text-gray-600"><span className="font-medium">Vehicle:</span> {line.replace('Vehicle:', '').trim()}</p>;
      if (line.startsWith('Incident Date:')) return <p className="text-gray-600"><span className="font-medium">Incident Date:</span> {line.replace('Incident Date:', '').trim()}</p>;
      if (line.startsWith('Summary:')) return <p className="text-gray-700 mt-2"><span className="font-medium">Summary:</span> {line.replace('Summary:', '').trim()}</p>;
      if (line.startsWith('Flag Status:')) return <p className="text-gray-600"><span className="font-medium">Flag Status:</span> {line.replace('Flag Status:', '').trim()}</p>;
      if (line.startsWith('Estimated repair cost is approximately')) return <p className="text-gray-600"><span className="font-medium">Estimated Repair Cost:</span> {line.replace('Estimated repair cost is approximately', '').trim()}</p>;
      if (line.startsWith('Recommendation:')) return <p className="text-red-600 mt-2"><span className="font-medium">Recommendation:</span> {line.replace('Recommendation:', '').trim()}</p>;
      return <p className="text-gray-600">{line}</p>;
    });

    return formattedLines;
  };

  return (
    <div className="space-y-2">
      {formatReport(aiReport)}
    </div>
  );
};

export default FormattedReport;