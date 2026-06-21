import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/user/signup', formData);
        navigate('/login');
    }

    return (
        <>
            <div id="root">
                <div>
                    <header>
                        <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                            <div className="container">
                                <a className="navbar-brand">Real Time Tasks</a>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target=".navbar-collapse"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                                    <ul className="navbar-nav flex-grow-1">
                                        <li className="nav-item">
                                            <a className="nav-link text-light" href="/">
                                                Home
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-light" href="/signup">
                                                Sign up
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-light" href="/login">
                                                Log in
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </header>
                    <div className="container" style={{ marginTop: 80 }}>
                        <div
                            className="row"
                            style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
                        >
                            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                                <h3>Sign up for a new account</h3>
                                <form onSubmit={onFormSubmit}>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="form-control"
                                        value={formData.firstName}
                                        onChange={onTextChange}
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="form-control"
                                        value={formData.lastName}
                                        onChange={onTextChange}
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={onTextChange}
                                    />
                                    <br />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={onTextChange}
                                    />
                                    <br />
                                    <button className="btn btn-primary">Signup</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Signup