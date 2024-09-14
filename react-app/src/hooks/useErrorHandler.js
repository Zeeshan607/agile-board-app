import { useCallback } from 'react';
import { toast } from 'react-toastify';

const useErrorHandler = () => {
  return useCallback((err) => {
    if (err.response) {
      const statusCode = err.response.status;
      const errorMessage = err.response.data?.msg || 'Oops! Something went wrong';

      if (statusCode === 400) {
        toast.error(`Validation Error: ${errorMessage}`);
      } else if (statusCode === 401) {
        toast.error('Unauthorized! Please login again.');
      } else if (statusCode === 404) {
        toast.error('Resource not found.');
      } else {
        toast.error(errorMessage);
      }
    } else if (err.request) {
      toast.error('No response from server. Please check your network connection.');
    } else {
      toast.error(`Error: ${err.message}`);
    }
  }, []);
};

export default useErrorHandler;