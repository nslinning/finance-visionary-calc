
import { useState, useEffect } from 'react';

export const useCalculatorUI = (theme: string = 'light') => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currency, setCurrency] = useState('NOK');  // Changed default from USD to NOK
  const [showSettings, setShowSettings] = useState(false);
  
  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);
  
  const openAddProductModal = () => {
    setModalType('addProduct');
    setShowModal(true);
  };
  
  return {
    activeTab,
    showModal,
    modalType,
    currency,
    showSettings,
    
    setActiveTab,
    setShowModal,
    setModalType,
    setCurrency,
    setShowSettings,
    openAddProductModal
  };
};

