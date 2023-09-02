import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Commits from './pages/Commits';

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/commits' element={<Commits/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default RoutesApp;
