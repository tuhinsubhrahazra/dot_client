import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
// import "./onboarding.css"
const url = process.env.REACT_APP_SERVER_URL

function Onboarding() {
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken === null || storedToken === undefined || storedToken === '') {
            navigate("/");
        }
    }, []);

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState("");

    const [birthMonth, setBirthMonth] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthYear, setBirthYear] = useState('');

    const months = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];

    const identityOptions = [
        { value: "", label: "choose (optional)" },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Non-binary", label: "Non-binary" },
        { value: "Prefer-not-to-say", label: "Prefer not to say" },
    ];

    const updateText = (value) => {
        setGender(value); // Update the selected identity
    };

    const generateDayOptions = () => {
        const options = [];
        for (let day = 1; day < 32; day++) {
            options.push(<option key={day} value={day}>{day}</option>);
        }
        return options;
    };

    const handleOnboarding = () => {
        let bDate = birthDate < 10 ? "0" + birthDate : birthDate;
        let bMonth = birthMonth < 10 ? "0" + birthMonth : birthMonth;
        let dob = bDate + "/" + bMonth + "/" + birthYear;

        if (name === '') {
            alert("Please provide your name");
            return;
        }
        else if (gender === '') {
            alert("Please provide your identity");
            return;
        }
        else if (dob.length < 10) {
            alert("Please provide the birthday");
            return;
        }

        setLoading(true);

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "authtoken": token,
                "Content-Type": "application/json"
            }
        };

        axios.post(url + '/details/addBasicDetails', {
            "name": name,
            "gender": gender,
            "dob": dob
        }, config)
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.status === true) {
                    setLoading(false);
                    navigate('/onboarding2');
                }
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error.response.data);
                setLoading(false);
            });
    }

    return (
        <div className='onboarding'>
            <Loading open={loading} />
            <div className="img-one">
                <img src="https://th.bing.com/th/id/OIP.dKv2J-Tow2barvadJedCCgHaE8?pid=ImgDet&rs=1" alt="image" />
            </div>
            <div className="form">
                <label for="name">Name:</label>
                <span id="span">so we know what to call you</span>
                <input value={name} onChange={v => setName(v.target.value)} type="text" id="name" name="name" placeholder="Name" style={{ width: "90%" }} />

                <label for="identity">Identity:</label>

                <span id="span">for a customized experience</span>
                <select id="identity" name="identity" style={{ width: "100%" }} onChange={(e) => updateText(e.target.value)}>
                    {identityOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>

                <div>
                    <label htmlFor="birthday">Birthday:</label>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <select
                            id="birthMonth"
                            name="birthMonth"
                            style={{ width: "40%" }}
                            onChange={(e) => setBirthMonth(e.target.value)}
                        >
                            <option value="" disabled selected>Month</option>
                            {months.map(month => (
                                <option key={month.value} value={month.value}>{month.label}</option>
                            ))}
                        </select>
                        <select
                            id="birthDate"
                            name="birthDate"
                            style={{ width: "22%" }}
                            onChange={(e) => setBirthDate(e.target.value)}
                        >
                            <option value="" disabled selected>Date</option>
                            {generateDayOptions()}
                        </select>
                        <input
                            type="text"
                            id="birthYear"
                            name="birthYear"
                            placeholder="Year"
                            style={{ width: "30%" }}
                            onChange={(e) => setBirthYear(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="btn" id="siginup">
                <button onClick={handleOnboarding} type="button" value="Continue">Continue</button><br /><br />
            </div>
        </div>
        // </div >

    )
}

export default Onboarding;