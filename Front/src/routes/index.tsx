import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Kanban, Login, ViewTicket, ArchivedTicket, CreateTeams, ViewUser } from '../pages';
import Chamado from '../pages/Ticket/Chamado';
import UpdateTicket from '../pages/Ticket/UpdateTicket';
import CreateUser from '../pages/User/CreateUser';
import CreateGroup from '../pages/Group/createGroup';
import UpdateGroup from '../pages/Group/updateGroup';
import ViewGroup from '../pages/Group/viewGroup';
import UpdateUser from '../pages/User/UpdateUser';
import ViewTeams from '../pages/Teams/ViewTeams';
import UpdateTeams from '../pages/Teams/UpdateTeams';
import NotFound from '../pages/Not_found/NotFound';
import CreateTree from '../pages/Tree/CreateTree';
import UpdateProfile from "../pages/User/UpdateProfile";
import PrivateRoute from "./PrivateRoute";


const RotaLogado = () => {
    <BrowserRouter>
            <Routes>
                <Route path="/user/create" element={<CreateUser />} />
                <Route path="/Ticket/update/:id" element={<UpdateTicket />} />
                <Route path='user/view' element={<ViewUser />} />
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/viewticket" element={<ViewTicket />} />
                <Route path="/Ticket/create" element={<Chamado />} />
                <Route path="/Ticket/update/:id" element={<UpdateTicket />} />
                <Route path="/ArchivedTicket" element={<ArchivedTicket />} />
                <Route path="/teams/create" element={<CreateTeams />} />
                <Route path="/group/create" element={<CreateGroup />} />
                <Route path="/group/update" element={<UpdateGroup />} />
                <Route path="/group/viewGroup" element={<ViewGroup />} />
                <Route path="/user/update/:id" element={<UpdateUser />} />
                <Route path="/user/updateProfile" element={<UpdateProfile />} />
                <Route path='/teams/view' element={<ViewTeams />} />
                <Route path='/teams/update' element={<UpdateTeams />} />
                <Route path='/tree/create' element={<CreateTree />} />
            </Routes>
            </BrowserRouter>
}



export { RotaLogado };

