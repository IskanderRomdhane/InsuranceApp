import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComponent = ({ 
  totalPages, 
  pageCourante, 
  setPageCourante,
  setExpandedId,
  sinistres,
  premierIndex,
  dernierIndex
}) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (event, pageNumber) => {
    setPageCourante(pageNumber);
    setExpandedId(null);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="text-sm text-gray-500 text-center mb-2">
        {premierIndex + 1}-{Math.min(dernierIndex, sinistres.length)} de{" "}
        {sinistres.length} Sinistres
      </div>
      <div className="flex items-center justify-center border-t border-gray-200 px-6 py-4 sm:px-8">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={pageCourante}
            onChange={handlePageChange}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#476f66',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#f1f5f5',
                },
                '&.Mui-selected': {
                  backgroundColor: '#476f66',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#3a5c54',
                  },
                },
              },
            }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default PaginationComponent;