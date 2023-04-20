import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings, UserProfile } from './components';
import { Kanban, Login, ViewTicket, ArchivedTicket, CreateTeams, ViewUser } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Chamado from './pages/Ticket/Chamado';
import UpdateTicket from './pages/Ticket/UpdateTicket';
import CreateUser from './pages/User/CreateUser';
import CreateGroup from './pages/Group/createGroup';
import UpdateGroup from './pages/Group/updateGroup';
import ViewGroup from './pages/Group/viewGroup';
import UpdateUser from './pages/User/UpdateUser';
import ViewTeams from './pages/Teams/ViewTeams';
import UpdateTeams from './pages/Teams/UpdateTeams';
import NotFound from './pages/Not_found/NotFound';
import CreateTree from './pages/Tree/CreateTree';
import UpdateProfile from "./pages/User/UpdateProfile";
import PrivateRoute from './routes/PrivateRoute';



const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, isLogged, notFound } = useStateContext();

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
            <div style={{ display: isLogged && notFound ? "" : "none" }} className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div style={{ display: isLogged && notFound ? "" : "none" }} className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}


          <div className={
            activeMenu ? isLogged && notFound ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full' : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
          >
            <div style={{ display: isLogged && notFound ? "" : "none" }} className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                <Route path="/" element={(<Login />)} />
                <Route path="/user/create" element={<PrivateRoute><CreateUser /></PrivateRoute>} />
                <Route path="/Ticket/update/:id" element={<PrivateRoute><UpdateTicket /></PrivateRoute>} />
                <Route path='user/view' element={<PrivateRoute><ViewUser /></PrivateRoute>} />
                <Route path="/kanban" element={<PrivateRoute> <Kanban /> </PrivateRoute>} />
                <Route path="/viewticket" element={<PrivateRoute><ViewTicket /></PrivateRoute>} />
                <Route path="/Ticket/create" element={<PrivateRoute><Chamado /></PrivateRoute>} />
                <Route path="/Ticket/update/:id" element={<PrivateRoute><UpdateTicket /></PrivateRoute>} />
                <Route path="/ArchivedTicket" element={<PrivateRoute><ArchivedTicket /></PrivateRoute>} />
                <Route path="/teams/create" element={<PrivateRoute><CreateTeams /></PrivateRoute>} />
                <Route path="/group/create" element={<PrivateRoute><CreateGroup /></PrivateRoute>} />
                <Route path="/group/update" element={<PrivateRoute><UpdateGroup /></PrivateRoute>} />
                <Route path="/group/viewGroup" element={<PrivateRoute><ViewGroup /></PrivateRoute>} />
                <Route path="/user/update/:id" element={<PrivateRoute><UpdateUser /></PrivateRoute>} />
                <Route path="/user/updateProfile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
                <Route path='/teams/view' element={<PrivateRoute><ViewTeams /></PrivateRoute>} />
                <Route path='/teams/update' element={<PrivateRoute><UpdateTeams /></PrivateRoute>} />
                <Route path='/tree/create' element={<PrivateRoute><CreateTree /></PrivateRoute>} />
                <Route path='*' element={<NotFound />} />
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