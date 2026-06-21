import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Logout from './Pages/Logout';
import AuthContextComponent from './AuthContext';
import PrivateRoute from './PrivateRoute';

const App = () => {

    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/logout' element={<Logout />} />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;