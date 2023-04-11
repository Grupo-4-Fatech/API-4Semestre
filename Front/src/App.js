import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings, UserProfile } from './components';
import {Kanban, Login, ViewTicket, ArchivedTicket, CreateTeams } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Chamado from './pages/Ticket/Chamado';
import UpdateTicket from './pages/Ticket/UpdateTicket';
import CreateUser from './pages/User/CreateUser';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings , isLogged} = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div style={{display: isLogged? "":"none"}}className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div style={{display: isLogged? "":"none"}} className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div 
            className={
              activeMenu
                ? isLogged?'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full': 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div style={{display: isLogged? "":"none"}}  className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                <Route path="/" element={(<Login/>)} />
                <Route path="/user/create" element={<CreateUser />} />
                <Route path="/user/update/:id" element={<UpdateTicket />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/viewticket" element={<ViewTicket />} />
                <Route path="/Ticket/create" element={<Chamado />} />
                <Route path="/Ticket/update/:id" element={<UpdateTicket />} />
                <Route path="/ArchivedTicket" element={<ArchivedTicket/>}/>
                <Route path="/teams/create" element={<CreateTeams/>}/>

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;