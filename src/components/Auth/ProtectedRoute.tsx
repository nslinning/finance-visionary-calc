
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthorized = localStorage.getItem('calculator_authorized');
    
    if (!isAuthorized) {
      navigate('/');
    }
  }, [navigate]);
  
  return <>{children}</>;
};

export default ProtectedRoute;
