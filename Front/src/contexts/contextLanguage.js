import React, { createContext, useContext, useState } from "react";
import  translations from "../utils/tradutorCriarGrupo";
import translationsChamado from "../utils/tradutorCriarChamado";
import translationsUpdateChamado from "../utils/tradutorUpdateChamado";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("pt");

  const changeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const value = {
    language,
    translations: translations[language],
    translationsChamado : translationsChamado[language],
    translationsUpdateChamado: translationsUpdateChamado[language],
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
