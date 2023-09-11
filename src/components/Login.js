import React from "react";
// import "./signup.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { useState } from "react";

const url = process.env.REACT_APP_SERVER_URL

function Login(params) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errortext, seterrortext] = useState("");

    function handleLogin(){
        setLoading(true);

        axios.post(url + '/auth/login', {
            email: email,
            password: password
        })
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.status === true) {
                    setLoading(false);
                    localStorage.setItem('token', response.data.token);
                    // navigate('/onboarding1');

                    if(response.data.process === 0){
                        navigate('/onboarding1');
                    }else if(response.data.process === 1){
                        navigate('/onboarding2');
                    }else{
                        navigate(`/${response.data.link}`);
                    }
                }
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error.response.data);
                seterrortext(error.response.data.msg);
                localStorage.setItem('token', '');
                setLoading(false);
            });

    }

    return (
        <div className='signup'>
            <Loading open={loading}/>
            <div className="container">

                <div className="img-one">
                    <img src="https://th.bing.com/th/id/OIP.dKv2J-Tow2barvadJedCCgHaE8?pid=ImgDet&rs=1" alt="images" />
                </div>
                <div className="text">
                    <h1>email + password</h1>
                    <p>enter with your favorite email</p>
                </div>

                <div className="line"></div>

                <div className="input-fild">
                    <input type="email" value={email} onChange={v => setEmail(v.target.value)} placeholder="email" />
                    <br /><br />
                    <input type="password" value={password} onChange={v => setPassword(v.target.value)} placeholder="password" /><br />
                </div>
                <br/>
                <p style={{fontSize:"16px", color:"red"}}>{errortext}</p>
                <div className="btn" id="siginup">
                    <button onClick={handleLogin} type="button">Log in</button> <br/><br/>
                    {/* <a href="/forget_password" id="forgot" style={{color: "black"}}>Forgot Password?</a> */}
                </div>
            </div>
        </div>
    )
}

export default Login