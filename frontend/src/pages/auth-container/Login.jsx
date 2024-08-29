import React, { useState } from 'react';
import './auth.css';
import { authLogin } from '../../services/api/apiService';
import { ToastSuccess, ToastError } from '../../components/toast/ToastNotification';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loaderAction } from '../../services/store/loader';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i
    const [inputData, setInputData] = useState({
        email: "",
        pswd: "",
        isSubmitted: false
    })
    /*
    * Event
    * Hendler
    */
    const handleChangeEvent = (e) => {
        const value = e.target.value;
        setInputData({
            ...inputData,
            [e.target.name]: value
        });
    }
    /*
    * Form
    * Validation
    */
    const valid = () => {
        let { email, pswd } = inputData;
        let checked = true;
        if (!regexEmail.test(email)) {
            checked = false;
        }
        if (pswd.length < process.env.REACT_APP_PASSWORD_LENGTH) {
            checked = false;
        }
        return checked;
    }
    /*
    * Api
    * Login
    */
    const login = async () => {
        dispatch(loaderAction.loader(true));
        const data = {
            "email": inputData.email,
            "password": inputData.pswd
          }
        try {
            const log = await authLogin(data);
            localStorage.setItem('token', log.data.token);
            ToastSuccess(`Login ${log.data.message}`)
            dispatch(loaderAction.loader(false));
            navigate('/');
        } catch (error) {
            console.log(error)
            ToastError(error.response.data.message);
            dispatch(loaderAction.loader(false));
        }
    }
    /*
    * Form
    * Submit
    */
    const formSubmitted = (event) => {
        event.preventDefault();
        setInputData({ ...inputData, isSubmitted: true });
        if (valid()) {
            login()
        }
    }
    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1 className='login-header'>EchoEmpire</h1>
                <form onSubmit={formSubmitted}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email">Email *</label>
                        <input
                            onChange={handleChangeEvent}
                            style={inputData.isSubmitted && !regexEmail.test(inputData.email) ? { borderColor: "red" } : {}}
                            type="email"
                            className="form-input"
                            placeholder="Enter email"
                            name="email" autoFocus />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd">Password *</label>
                        <input
                            onChange={handleChangeEvent}
                            style={inputData.isSubmitted && inputData.pswd.length < process.env.REACT_APP_PASSWORD_LENGTH ? { borderColor: "red" } : {}}
                            type="password"
                            className="form-input"
                            placeholder="Enter password"
                            name="pswd" />
                    </div>
                    <button type="submit" className="btn btn-info w-100 text-white">Log In</button>
                </form>
            </div>
        </div>
    );
}
export default Login;