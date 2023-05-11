import React, { createContext, useContext, useState } from "react";
import  translations from "../utils/tradutor/tradutorCriarGrupo";
import translationsChamado from "../utils/tradutor/tradutorCriarChamado";
import translationsUpdateChamado from "../utils/tradutor/tradutorUpdateChamado";
import tradutorKanban from "../utils/tradutor/tradutorKanban";
import archivedTicktes from "../utils/tradutor/tradutorArchivedTickets";
import visualizarChamado from "../utils/tradutor/visualizarChamado";

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
    tradutorKanban: tradutorKanban[language],
    archivedTicktes:archivedTicktes[language],
    visualizarChamado: visualizarChamado[language],
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
