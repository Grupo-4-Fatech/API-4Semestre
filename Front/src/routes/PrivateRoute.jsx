import { Navigate } from "react-router-dom";

import { useAutenticacao } from "../contexts/ContextUsuLogado.tsx";
import React from "react";

const PrivateRoute = ({ children }) => {
    const { usuario } = useAutenticacao();
    console.log("asdas " , usuario);
    if (!usuario) {
        return <Navigate to="/" replace />
    }
    return children
};

export default PrivateRoute;