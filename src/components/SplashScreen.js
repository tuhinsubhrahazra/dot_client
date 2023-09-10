import React from "react";
import { useState } from "react";
// import "./splash_screen.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
const url = process.env.REACT_APP_SERVER_URL

function SplashScreen(params) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    let hasToken;
    if (token) hasToken = true;
    else hasToken = false;

    function handleContinue() {
        setLoading(true);

        console.log(token);
        const config = {
            headers: {
                "authtoken": token,
                "Content-Type": "application/json"
            }
        };

        axios.post(url + '/auth/login', {}, config)
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.status === true) {
                    setLoading(false);
                    localStorage.setItem('token', response.data.token);

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
                localStorage.setItem('token', '');
                setLoading(false);
            });
    }

    return (

        <div className="container_sp" class="splash_screen">
            <Loading open={loading} />
            <div className="img-one">
                <img src="https://th.bing.com/th/id/OIP.dKv2J-Tow2barvadJedCCgHaE8?pid=ImgDet&rs=1" alt="one" />
            </div>
            <div className="text">
                <h1>Time to Network</h1>
                <p>upgrade your business card</p>

            </div>

            <div className="line2"></div>

            {!hasToken || <div className="continueBtn" >
                <button onClick={handleContinue} type="button">Continue Profile</button><br />
            </div>}

            {<div className="btn2" id="siginup">
                <a href="/signup"><button type="button">Sign Up</button></a><br />
            </div>}

            {hasToken || <div className="btn2" id="Login">
                <a href="/login"><button type="button">Login</button></a>
            </div>}
        </div>
    )
}

export default SplashScreen;