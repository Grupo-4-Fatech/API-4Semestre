import React, { createContext, useContext, useState } from "react";
import translationsChamado from "../utils/tradutor/ticket/tradutorCriarChamado";
import translationsUpdateChamado from "../utils/tradutor/ticket/tradutorUpdateChamado";
import tradutorKanban from "../utils/tradutor/tradutorKanban";
import archivedTicktes from "../utils/tradutor/ticket/tradutorArchivedTickets";
import visualizarChamado from "../utils/tradutor/ticket/tradutorVisualizarChamado";
import tradutorCriarGruop from "../utils/tradutor/group/tradutorCriarGroup";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState( window.localStorage.getItem("language") === null? "pt": window.localStorage.getItem("language"));
 
  const changeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };
  

  const value = {
    language,
    tradutorCriarGruop: tradutorCriarGruop[language],
    translationsChamado: translationsChamado[language],
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
