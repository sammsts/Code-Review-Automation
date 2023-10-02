import { React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Commits from './pages/Home/Commits';

// const Private = ({ Item }) => {
//     const { logado } = useAuth();

//     return logado > 0 ? <Item /> : <Login />;
// }

const RoutesApp = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="" element={ <Login/> } />
                    <Route path="/commits" element={ <Commits/> } />
                </Routes>
         </BrowserRouter>
    );
};

export default RoutesApp;