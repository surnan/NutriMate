// frontend/src/context/ThemeContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(() => (localStorage.getItem('theme') || 'light'));
  // const [theme, setTheme] = useState(() => {
  //   return localStorage.getItem('theme') || 'light';
  // });

  const getStoredBoolean = (key, defaultValue) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
    } catch {
      return defaultValue;
    }
  };


  const getStoredValue = (key, defaultValue) => {
    return localStorage.getItem(key) ?? defaultValue;
  };
  
  const [showProtein, setShowProtein] = useState(() => getStoredBoolean('showProtein', true));
  const [showCarbs, setShowCarbs] = useState(() => getStoredBoolean('showCarbs', true));
  const [showFats, setShowFats] = useState(() => getStoredBoolean('showFats', true));
  const [showSugars, setShowSugars] = useState(() => getStoredBoolean('showSugars', true));
  const [timeValue, setTimeValue] = useState(() => getStoredValue('timeValue', ''));




  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  const toggleShowProtein = () => {
    const newValue = !showProtein;
    setShowProtein(newValue);
    localStorage.setItem('showProtein', JSON.stringify(newValue));
  };

  const toggleShowCarbs = () => {
    const newValue = !showCarbs;
    setShowCarbs(newValue);
    localStorage.setItem('showCarbs', JSON.stringify(newValue));
  };

  const toggleShowFats = () => {
    const newValue = !showFats;
    setShowFats(newValue);
    localStorage.setItem('showFats', JSON.stringify(newValue));
  };

  const toggleShowSugars = () => {
    const newValue = !showSugars;
    setShowSugars(newValue);
    localStorage.setItem('showSugars', JSON.stringify(newValue));
  };

  const updateTimeValue = (newValue) => {
    setTimeValue(newValue);
    localStorage.setItem('timeValue', newValue);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('showProtein', JSON.stringify(showProtein));
    localStorage.setItem('showCarbs', JSON.stringify(showCarbs));
    localStorage.setItem('showFats', JSON.stringify(showFats));
    localStorage.setItem('showSugars', JSON.stringify(showSugars));
    localStorage.setItem('timeValue', timeValue);
  }, [theme, showProtein, showCarbs, showFats, showSugars, timeValue]);


  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);


  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        showProtein, 
        toggleShowProtein, 
        showCarbs, 
        toggleShowCarbs, 
        showFats, 
        toggleShowFats, 
        showSugars, 
        toggleShowSugars,
        timeValue,
        updateTimeValue
         
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
