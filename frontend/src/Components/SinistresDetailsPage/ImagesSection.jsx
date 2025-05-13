import React from 'react'

const ImagesSection = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-3 text-[#476f66]">Images</h3>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-3 text-[#476f66]">Images</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {images.map((image) => (
          <div key={image.id} className="bg-white p-2 rounded border">
            <img 
              src={image.imageUrl || "/api/placeholder/300/200"} 
              alt={image.name || "Claim image"} 
              className="w-full h-32 object-cover rounded mb-2" 
            />
            <p className="text-sm text-gray-600 truncate">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesSection