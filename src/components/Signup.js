import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
const url = process.env.REACT_APP_SERVER_URL

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorRes, setErrorRes] = useState(false);

    function handleSignup() {
        setLoading(true);
        if(!email) return alert("Please enter email");
        if(!password) return alert("Please enter password");    

        axios.post(url + '/auth/signup', {
            "email": email,
            "password": password
        })
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.status === true) {
                    setLoading(false);
                    localStorage.setItem('token', response.data.token);
                    navigate('/onboarding1');
                }
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error.response.data);
                setErrorRes(error.response.data.msg);
                setLoading(false);
            });
    }

    return (
        <div class="container">
            <Loading open={loading}/>
            <div class="img-one">
                <img src="https://th.bing.com/th/id/OIP.dKv2J-Tow2barvadJedCCgHaE8?pid=ImgDet&rs=1" alt="images" />
            </div>
            <div class="text">
                <h1>email + password</h1>
                <p>enter with your favorite email</p>

            </div>

            <div class="line"></div>

            <div class="input-fild">
                <input type="email" value={email} onChange={v => setEmail(v.target.value)} placeholder="email" /><br /><br />
                <input type="password" value={password} onChange={v => setPassword(v.target.value)} placeholder="password" /><br /><br />
            </div>
            <p style={{fontSize:"18px", color:"red"}}>{errorRes}</p> 
            <div class="btn2" id="siginup">
                <button onClick={handleSignup} type="button">Sign Up</button>
            </div>
            <br/>
        </div>
    )
}

export default Signup;