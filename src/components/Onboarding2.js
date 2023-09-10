import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
// import "./onboarding2.css"
const url = process.env.REACT_APP_SERVER_URL

function Onboarding2() {
    const [loading, setLoading] = useState(false);
    const [linkLoading, setLinkLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [isLinkAvailable, setIsLinkAvailable] = useState(false);
    const [isLinkNotAvailable, setIsLinkNotAvailable] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken === null || storedToken === undefined || storedToken === '') {
            navigate("/");
        } else {
            const token = localStorage.getItem('token');
            setLoading(true);

            const config = {
                headers: {
                    "authtoken": token,
                    "Content-Type": "application/json"
                }
            };

            axios.post(url + '/auth/checkOnboarding2', {}, config)
                .then((response) => {
                    console.log('Response:', response.data);
                    setLoading(false);
                    if (response.data.status === false) {
                        navigate("/onboarding1");
                    }
                })
                .catch((error) => {
                    // Handle errors
                    navigate("/onboarding1");
                    setLoading(false);
                });
        }


    }, []);

    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemClick = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selected => selected !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    function handleOnboarding2() {
        if (isLinkAvailable) {
            setLoading(true);
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "authtoken": token,
                    "Content-Type": "application/json"
                }
            };

            let str_selected = '';

            selectedItems.map(v => {
                str_selected += v;
                str_selected += '_';
            });

            axios.post(url + '/profile/addlink', {
                link: username,
                skills: str_selected
            }, config)
                .then((response) => {
                    console.log('Response:', response.data);
                    if (response.data.status === true) {
                        setLoading(false);
                        navigate('/setup');
                    }
                })
                .catch((error) => {
                    // Handle errors
                    console.error('Error:', error.response.data);
                    setLoading(false);
                    navigate('/');
                });
        }
    }

    function setUserName(v) {
        if (!linkLoading) {
            setLinkLoading(true);
            setIsLinkAvailable(false);
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "authtoken": token,
                    "Content-Type": "application/json"
                }
            };

            axios.post(url + '/profile/isLinkExist', {
                link: v
            }, config)
                .then((response) => {
                    console.log('Response:', response.data);
                    if (response.data.status === true) {
                        setLinkLoading(false);
                        setIsLinkAvailable(true);
                        setUsername(v);
                    }
                })
                .catch((error) => {
                    // Handle errors
                    console.error('Error:', error.response.data);
                    setLinkLoading(false);
                    setIsLinkAvailable(false);
                    if (error.response.data.msg === 'This username is already in use, please enter something else.') {
                        setIsLinkNotAvailable(true);
                    }
                });
        }
    }

    return (
        <div className='onboarding2'>
            <Loading open={loading} />
            <div className="user-form">
                <img className="user-image" src="https://img.freepik.com/free-photo/businessman-working-laptop_1098-21110.jpg?w=360" alt="User" />
                <h1>One link</h1>
                <span className="text">to share all your information</span>
                <div>
                    <input className={`input-field ${isLinkAvailable ? 'tick' : isLinkNotAvailable ? 'cross' : ''}`} onChange={v => setUserName(v.target.value)} type="text" placeholder="cxnnect.com/@username" />
                    {linkLoading && <CircularProgress color="primary" size={30} className='progress-circle' />}

                    <h1>Pick a niche</h1>
                    <span className="text">for a customized experience</span>

                    <div className="onb_container">
                        <br />
                        <ul id="itemList" className="selectable-list">
                            <li className={`selectable-item ${selectedItems.includes("Creative") ? 'selected' : ''}`} onClick={() => handleItemClick("Creative")}>Creative</li>
                            <li className={`selectable-item ${selectedItems.includes("Real Estate") ? 'selected' : ''}`} onClick={() => handleItemClick("Real Estate")}>Real Estate</li>
                            <li className={`selectable-item ${selectedItems.includes("Influencer") ? 'selected' : ''}`} onClick={() => handleItemClick("Influencer")}>Influencer</li>
                            <li className={`selectable-item ${selectedItems.includes("Music") ? 'selected' : ''}`} onClick={() => handleItemClick("Music")}>Music</li>
                            <li className={`selectable-item ${selectedItems.includes("Athlete") ? 'selected' : ''}`} onClick={() => handleItemClick("Athlete")}>Athlete</li>
                            <li className={`selectable-item ${selectedItems.includes("Business") ? 'selected' : ''}`} onClick={() => handleItemClick("Business")}>Business</li>
                            <li className={`selectable-item ${selectedItems.includes("Social") ? 'selected' : ''}`} onClick={() => handleItemClick("Social")}>Social</li>
                            <li className={`selectable-item ${selectedItems.includes("Video Creator") ? 'selected' : ''}`} onClick={() => handleItemClick("Video Creator")}>Video Creator</li>
                            <li className={`selectable-item ${selectedItems.includes("Artist") ? 'selected' : ''}`} onClick={() => handleItemClick("Artist")}>Artist</li>
                            <li className={`selectable-item ${selectedItems.includes("Education") ? 'selected' : ''}`} onClick={() => handleItemClick("Education")}>Education</li>
                            <li className={`selectable-item ${selectedItems.includes("Entrepreneur") ? 'selected' : ''}`} onClick={() => handleItemClick("Entrepreneur")}>Entrepreneur</li>
                            <li className={`selectable-item ${selectedItems.includes("Gaming") ? 'selected' : ''}`} onClick={() => handleItemClick("Gaming")}>Gaming</li>
                            <li className={`selectable-item ${selectedItems.includes("Blogging") ? 'selected' : ''}`} onClick={() => handleItemClick("Blogging")}>Blogging</li>
                            <li className={`selectable-item ${selectedItems.includes("Photography") ? 'selected' : ''}`} onClick={() => handleItemClick("Photography")}>Photography</li>
                            <li className={`selectable-item ${selectedItems.includes("Beauty") ? 'selected' : ''}`} onClick={() => handleItemClick("Beauty")}>Beauty</li>
                            <li className={`selectable-item ${selectedItems.includes("Writer") ? 'selected' : ''}`} onClick={() => handleItemClick("Writer")}>Writer</li>
                        </ul>
                    </div>

                    <button onClick={handleOnboarding2} className="btn2 button" type="submit">Submit</button>
                    <br />
                    <br />
                </div>
            </div>

        </div>

    )
}

export default Onboarding2;