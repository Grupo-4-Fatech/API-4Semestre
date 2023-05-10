import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useAutenticacao } from '../contexts/ContextUsuLogado.tsx';
import { useLanguage } from "../contexts/contextLanguage.js";

import { linksPt, linksEn } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {

  const { currentColor, activeMenu, setActiveMenu, screenSize, currentMode } = useStateContext();
  const { language } = useLanguage();


  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  }
  const { usuario } = useAutenticacao();

  const userPermission = usuario?.role
  function getFilteredLinks() {
    const linguagem = language === "pt" ? linksPt : linksEn
    const newLinks = linguagem
      .map((item) => {
        const filteredLinks = item.links.filter((link) => link.permission >= userPermission);
        if (filteredLinks.length > 0) {
          return {
            title: item.title,
            links: filteredLinks
          };
        }
        return null;
      })
      .filter((item) => item !== null);
    return newLinks;
  }


  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const logoLight = 'https://s3-sa-east-1.amazonaws.com/recrutai-dev/1647fba0-ea33-11eb-9826-8d3dd8a2a1d2/logo/1647fba0-ea33-11eb-9826-8d3dd8a2a1d2_1628785344229_54w.png'
  const logoDark = 'https://uploads-ssl.webflow.com/60dcc4691817e11aa93685ab/636cfbef568f863947dd4951_logo-color.svg'


  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/viewTicket" onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3
             mt-4 flex text-xl font-extrabold
              tracking-tight dark:text-white
             text-slate-900">

              {/* Logo da ionicHelth */}

              {currentMode === 'Light' ? (
                <img src={logoLight} alt="Logotipo de IONIC Health" width="137" className="image-4" />
              ) : (
                <img src={logoDark} alt="Logotipo de IONIC Health" width="137" className="image-4" />
              )}

            </Link>

            {/* Botão de fechamento */}
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 
                hover:bg-light-gray mt-4 
                block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          {/* Itens da SideBar obs: vindos da Data */}
          {usuario === null ? '' :
            <div className="mt-10 ">
              {getFilteredLinks().map((item) => (
                item.links.length && (
                  <div key={item.title}>

                    <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                      {item.title}
                    </p>

                    {item.links.map((link) => (
                      <NavLink
                        to={`/${link.name}`}
                        key={link.name}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : '',
                        })}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                      >
                        {link.icon}
                        <span className="capitalize">{link.title}</span>
                      </NavLink>
                    ))}

                  </div>
                )))}
            </div>
          }
        </>
      )}
    </div>
  );
};

export default Sidebar;