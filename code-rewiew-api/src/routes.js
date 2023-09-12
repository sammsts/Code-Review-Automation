import { React } from 'react';
import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuth from "./hooks/useAuth"
import Login from './pages/Login/Login';
import Commits from './pages/Home/Commits';

// const Private = ({ Item }) => {
//     const { logado } = useAuth();

//     return logado > 0 ? <Item /> : <Login />;
// }

const RoutesApp = () => {
    return (
        <BrowserRouter>
             {/* <Fragment> */}
                <Routes>
                    <Route path="/commits" element={ <Commits/> } />
                    <Route path="/login" element={ <Login/> } />
                    {/* <Route exact path="/commits" element={<Private Item={Commits} />} /> */}
                    {/* <Route path="/" element={<Login />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path="*" element={<Login />} /> */}
                </Routes>
             {/* </Fragment> */}
         </BrowserRouter>
    );
};

export default RoutesApp;