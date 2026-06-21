import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthDataContext } from '../AuthContext';

const Home = () => {

    const [jobs, setJobs] = useState([]);
    const [title, setTitle] = useState('')
    const { user } = useAuthDataContext();

    useEffect(() => {
        const GetJobs = async () => {
            const { data } = await axios.get('/api/jobs/getall');
            setJobs(data);
        }
        GetJobs();
    }, []);

    const GetButton = (status) => {
        if (status === 'Available') {
            return <td><button className="btn btn-dark">I'm doing this one!!!</button></td>
        }
        if (status === 'Taken') {
            return <td><button className="btn btn-danger">_ is doing it</button></td>
        }
        if (status === 'Done') {
            return <td><button className="btn btn-warning">I'm done!</button></td>
        }
    }

    const OnAddClick = async () => {
        
        await axios.post('/api/jobs/add', { title: title, userId: user.id })
    }

    return (
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
                                        <a className="nav-link text-light" href="/logout">
                                            Log out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="container" style={{ marginTop: 80 }}>
                    <div style={{ marginTop: 70 }}>
                        <div className="row">
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Task Title"
                                    defaultValue=""
                                    onChange={e => { setTitle(e.target.value) }}
                                />
                            </div>
                            <div className="col-md-2">
                                <button onClick={OnAddClick} className="btn btn-primary w-100">Add Task</button>
                            </div>
                        </div>
                        <table className="table table-hover table-striped table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody >
                                {jobs.map(j => {
                                    <tr>key={j.Id}
                                        <td>{j.Title}</td>
                                        <td>{GetButton(j.Status)}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Home;