import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuthDataContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';


const Logout = () => {

    const { setUser } = useAuthDataContext();
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async() => {
            await axios.get('/api/user/logout');
            setUser(null);
            navigate('/login');
        }
        logout();
    },[])

    return(<></>)
}
export default Logout