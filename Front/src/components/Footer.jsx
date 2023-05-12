import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { useLanguage } from "../contexts/contextLanguage";
import tradutorFooter from '../utils/tradutor/footer/tradutorFooter';


const Footer = () => {
  const { currentColor } = useStateContext();
  const { language } = useLanguage();

  return (
  <div className="mt-24">
    <p className="dark:text-gray-200 text-gray-700 text-center m-20">
      © 2023 {tradutorFooter[language].direitos}
      <a 
        className='font-medium hover:underline' 
        href="https://pt-br.ionic.health"
        style={{color: currentColor}}> Ionic Health</a> 
    </p>
  </div>
)};

export default Footer;