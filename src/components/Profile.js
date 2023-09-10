import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import Loading from './Loading';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
// import "../src/Profile.css"
// import "../src/card.css"

const url = process.env.REACT_APP_SERVER_URL

function Profile() {

    const [loading, setLoading] = useState(false);
    const { profileName } = useParams();
    const [name, setName] = useState("");
    const [headline, setHeadline] = useState("");
    const [work, setWork] = useState("");
    const [location, setLocation] = useState("");
    const [education, seteducation] = useState("");
    const [invalidUrl, setinvalidUrl] = useState(false);
    const [skills, setSkills] = useState([]);
    const [linkls, setLinks] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [imageDataCover, setimageDataCover] = useState(null);
    const [isSameUser, setisSameUser] = useState(false);
    const [modeEdit, setModeEdit] = useState(true);

    useEffect(() => {
        setLoading(true);

        const token = localStorage.getItem('token');
        console.log(token);
        let config;
        if(token){
            config = {
                headers: {
                    "authtoken": token,
                    "Content-Type": "application/json"
                }
            };
        }else{
            config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
        }
        config = {
            headers: {
                "authtoken": token,
                "Content-Type": "application/json"
            }
        };

        axios.post(url + '/profile/getProfileData', {
            link: profileName
        }, config)
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.status === true) {
                    setLoading(false);
                    setisSameUser(response.data.isSameUser);
                    setName(response.data.profileData[0].basicdetails_name);
                    if (response.data.profileData[0].profile_bio_headline != "null") {
                        setHeadline(response.data.profileData[0].profile_bio_headline);
                    }
                    if (response.data.profileData[0].profile_bio_work != "null") {
                        setWork(response.data.profileData[0].profile_bio_work);
                    }
                    if (response.data.profileData[0].profile_bio_location != "null") {
                        setLocation(response.data.profileData[0].profile_bio_location);
                    }
                    if (response.data.profileData[0].profile_bio_education != "null") {
                        seteducation(response.data.profileData[0].profile_bio_education);
                    }

                    const resultArray = response.data.profileData[0].profile_skills.split("_").filter(Boolean);
                    setSkills(resultArray);
                    if (response.data.profileData[0].links[0].type) {
                        setLinks(response.data.profileData[0].links);
                    }
                    setinvalidUrl(false);

                    if (response.data.profileData[0].profilepic_image_data) {
                        const base64ImagePP = btoa(
                            new Uint8Array(response.data.profileData[0].profilepic_image_data.data).reduce(
                                (data, byte) => data + String.fromCharCode(byte),
                                ''
                            )
                        );
                        setImageData(base64ImagePP);
                    }

                    if (response.data.profileData[0].coverpic_image_data) {
                        const base64ImageCP = btoa(
                            new Uint8Array(response.data.profileData[0].coverpic_image_data.data).reduce(
                                (data, byte) => data + String.fromCharCode(byte),
                                ''
                            )
                        );

                        setimageDataCover(base64ImageCP);
                    }

                }
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
                setLoading(false);
                if(error.response.status === 404){
                    setinvalidUrl(true);
                }
            });
    }, []);

    function handleClickEdit(){
        setModeEdit(true);
    }

    function handleClickPrev(){
        setModeEdit(false);
    }

    return (
        <div className="container">
            <Loading open={loading} />
            {!invalidUrl || <h1>Invalid Url</h1>}
            {invalidUrl || loading || <div className="" style={{width: "100%", margin: "0 auto"}}>
                <div className="top_PR">    
                    <div className="setting">   
                        <i className="fa fa-cog" aria-hidden="true"></i>
                    </div>
                    <h2 style={{fontSize: "20px"}}>CXNNECT</h2>
                    <div className="share">
                        <i className="fa fa-rocket" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="card_PR">   
                    <div className="box_PR">
                        <img src={ imageDataCover!=null?`data:image/jpeg;base64,${imageDataCover}`: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1016-c-08_1-ksh6mza3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=f584d8501c27c5f649bc2cfce50705c0"} style={{ backgroundColor: "white" }} alt="" />
                    </div>
                    <div className="box_PR">
                        <div className="content_PR">
                            <h1>{name}<span>{headline}</span><span>{work}</span><span>{location}</span><span>{education}</span></h1>
                            <br/>
                            <ul>
                                {
                                    skills.map((item, index) => (
                                        <li>
                                            <div className="info-box">
                                                {item}
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            {isSameUser && <div className="cta_PR">  
                                <button style={{ backgroundColor: modeEdit ? 'black' : 'white', color: modeEdit ? 'white': 'black' }} onClick={handleClickEdit} className="btn3">Edit</button>
                                <button style={{ backgroundColor: modeEdit ? 'white' : 'black', color: modeEdit ? 'black': 'white' }} onClick={handleClickPrev} className="btn4">Preview</button>
                            </div>}
                        </div>
                    </div>
                    <div className="circle_PR">
                        <img src={ imageData!=null?`data:image/jpeg;base64,${imageData}`:"https://icons-for-free.com/iconfiles/png/512/instagram+profile+user+icon-1320184028326496024.png"} style={{ backgroundColor: "white" }} alt="" />
                    </div>
                </div>
                {isSameUser && modeEdit && <div className="editBtn">
                    <a href="/setup" className="buttonLink">Edit Profile</a>
                </div>}
                <div className="social">

                    <div className="social">
                        {linkls &&
                            linkls.map((item, index) => (
                                <div className="contactInfo">
                                    <div className="people-icon">
                                        {
                                            item.type.includes("website") ? "🌐" : item.type.includes("gmail") ? "📧" : item.type.includes("phone") ? "📱" : "📱"
                                        }
                                    </div>
                                    <div className="info">
                                        <div className="heading">{item.type.replace(/\d+$/, '').toUpperCase()}</div>
                                        <div className="subheading">{item.value}</div>
                                    </div>
                                    {/* <div className="updown-icon">↕</div> */}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default Profile;