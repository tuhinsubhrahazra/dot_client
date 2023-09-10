import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import ColorChangingCard from './ColorChangingCard'
// import "./setup.css"

const url = process.env.REACT_APP_SERVER_URL

function Setup() {
    const navigate = useNavigate();
    const [skillsItems, setSkillsItems] = useState([]);
    const [name, setName] = useState("");
    const [work, setWork] = useState("");
    const [headline, setHeadline] = useState("");
    const [location, setLocation] = useState("");
    const [education, setEducation] = useState("");
    const [skill, setSkill] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedProfilePic, setselectedProfilePic] = useState(null);
    const [selectedCoverPic, setselectedCoverPic] = useState(null);
    const [profile_link, setProfile_link] = useState(null);

    const addSkills = () => {
        setSkillsItems([...skillsItems, skill]);
        setSkill("");
    }


    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setselectedProfilePic(imageUrl);
            uploadProfilePic(file);
        }
    };

    const handleCoverImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setselectedCoverPic(imageUrl);
            uploadCoverImage(file);
        }
    };

    const handleProfilePicClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleCoverPicClick = () => {
        document.getElementById('fileInputCover').click();
    };

    const handdleSubmit = () => {
        let str_selected = '';

        skillsItems.map(v => {
            str_selected += v;
            str_selected += '_';
        });

        setLoading(true);

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "authtoken": token,
                "Content-Type": "application/json"
            }
        };

        const formData = new FormData();

        formData.append('name', name);
        formData.append('headline', headline);
        formData.append('work', work);
        formData.append('location', location);
        formData.append('education', education);
        formData.append('skills', str_selected);

        axios.post(url + '/profile/addBioAndUrl', formData, config)
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.status === true) {
                    // if (selectedProfilePic) {
                    // } else {
                    setLoading(false);
                    navigate(`/${profile_link}`);
                    // }
                }
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error.response.data);
                setLoading(false);
                if (error.response.status === 400) {
                    alert(error.response.data.msg);
                } else {
                    localStorage.setItem('token', '');
                    navigate('/');
                }
            });
    }

    function uploadProfilePic(file) {
        console.log("selectedProfilePic: " + file);

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "authtoken": token,
                "Connection": "keep-alive"
            }
        };

        const formData = new FormData();

        formData.append('image', file);

        setLoading(true);
        axios.post(url + '/profile/addProfilePic', formData, config)
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.status === true) {
                    // if (selectedCoverPic) {
                    //     // uploadCoverImage()
                    // } else {
                    setLoading(false);
                    //     navigate('/tuhin');
                    // }
                }
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error.response.data);
                setLoading(false);
                if (error.response.status === 400) {
                    alert(error.response.data.msg);
                } else {
                    localStorage.setItem('token', '');
                    navigate('/');
                }
            });
    }

    function uploadCoverImage(file) {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "authtoken": token,
                "Connection": "keep-alive"
            }
        };

        const formData = new FormData();

        formData.append('image', file);

        setLoading(true);
        axios.post(url + '/profile/addCoverPic', formData, config)
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.status === true) {
                    setLoading(false);
                    // navigate('/tuhin');
                }
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error.response.data);
                setLoading(false);
                if (error.response.status === 400) {
                    alert(error.response.data.msg);
                } else {
                    localStorage.setItem('token', '');
                    navigate('/');
                }
            });
    }

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "authtoken": token,
                "Connection": "keep-alive"
            }
        };

        axios.post(url + '/profile/getProfiledataForEdit', {}, config)
            .then((response) => {
                setLoading(false);
                console.log('Response:', response.data);
                if (response.data.status === true) {
                    setName(response.data.profileData[0].basicdetails_name);

                    // setHeadline(response.data.profileData[0].profile_bio_headline)
                    // setWork(response.data.profileData[0].profile_bio_work)
                    // setLocation(response.data.profileData[0].profile_bio_location)
                    // setEducation(response.data.profileData[0].profile_bio_education)

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
                        setEducation(response.data.profileData[0].profile_bio_education);
                    }

                    const skillsArray = response.data.profileData[0].profile_skills.split("_").filter(Boolean);
                    console.log(skillsArray);
                    setSkillsItems(skillsArray);
                    setProfile_link(response.data.profileData[0].profile_link);

                    if (response.data.profileData[0].profilepic_image_data) {
                        const base64ImagePP = btoa(
                            new Uint8Array(response.data.profileData[0].profilepic_image_data.data).reduce(
                                (data, byte) => data + String.fromCharCode(byte),
                                ''
                            )
                        );
                        setselectedProfilePic(`data:image/jpeg;base64,${base64ImagePP}`);
                    }

                    if (response.data.profileData[0].coverpic_image_data) {
                        const base64ImageCP = btoa(
                            new Uint8Array(response.data.profileData[0].coverpic_image_data.data).reduce(
                                (data, byte) => data + String.fromCharCode(byte),
                                ''
                            )
                        );

                        setselectedCoverPic(`data:image/jpeg;base64,${base64ImageCP}`);
                    }
                }
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error.response.data);
                setLoading(false);
                if (error.response.status === 400) {
                    alert(error.response.data.msg);
                } else {
                    localStorage.setItem('token', '');
                    navigate('/');
                }
            });
    }, []);

    return (
        <div className="container">
            <Loading open={loading} />

            <div className="top1" style={{textAlign: "center"}}>
                <div className="setting22">
                    <h1 style={{textAlign: "center", width: "100%"}}>SetUp</h1>
                </div>
                {/* <div className="go">
                    <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </div> */}
            </div>

            {false && <div className="top">
                <div className="on-off">
                    <i className="fa fa-toggle-off" aria-hidden="true"></i>
                </div>
                <div className="link">
                    {/* <i className="fa fa-link" aria-hidden="true"></i>    */}
                </div>
                <div className="usertext">
                    <h4>x.cards/{profile_link}</h4>
                </div>
                <div className="status">
                    <i className="fa fa-circle" aria-hidden="true"></i>
                </div>
            </div>}

            <div className="cardbody">
                <div className="pic">
                    <div className="cover" onClick={handleCoverPicClick}>
                        <i className="fa fa-upload" aria-hidden="true"></i>
                        <img src={selectedCoverPic} alt="" />
                    </div>
                    <div className="profilepic" onClick={handleProfilePicClick}>
                        <i className="fa fa-upload" aria-hidden="true"></i>
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                        <img src={selectedProfilePic} alt="" />
                    </div>
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleProfileImageChange}
                    />

                    <input
                        id="fileInputCover"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleCoverImageChange}
                    />
                </div>
                <div className="name">
                    <input type="text" required placeholder="Name" value={name} onChange={v => setName(v.target.value)} />
                </div>

                <div className="bio">
                    <br />
                    <h3>Bio</h3>

                    <div className="bio-input">
                        <input type="text" required placeholder="Headline" value={headline} onChange={v => setHeadline(v.target.value)} />
                        <input type="text" required placeholder="Work" value={work} onChange={v => setWork(v.target.value)} />
                        <input type="text" required placeholder="Location" value={location} onChange={v => setLocation(v.target.value)} />
                        <input type="text" required placeholder="Education" value={education} onChange={v => setEducation(v.target.value)} />
                    </div>
                    <div className="container-select">
                        <ul id="itemList" className="selectable-list">
                            {
                                skillsItems.map((item, index) => (
                                    <li key={index} className="selectable-item">{item}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="skill-add">
                        <input value={skill} onChange={v => setSkill(v.target.value)} type="text" placeholder="Skills" />
                        <button onClick={addSkills} type="button">Add</button>
                    </div>
                </div>

                <br /><h3>Contact Info</h3><br />

                <div className="contact2">
                    <div class="grid-container grid-buttons">
                        <div class="grid-item   ">
                            <a href="/setup/Website"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/2057px-Safari_browser_logo.svg.png" alt="Facebook" /></a>
                            <a href="/setup/Gmail"><img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png" alt="Facebook" /></a>
                            <a href="/setup/Phone"><img src="https://play-lh.googleusercontent.com/wwzWuDb8ivbarUCpB7sEaUkx-vq6HbbqNZ2Eg5a_HpXNNyQpp-cFcNCcG-O9T28N8RLv" alt="Facebook" /></a>
                            <a href="/setup/Location"><img src="https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png" alt="Facebook" /></a>
                            <a href="/setup/Whatsapp"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/767px-WhatsApp.svg.png" alt="Facebook" /></a>
                            <a href="/setup/Telegram"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" alt="Facebook" /></a>
                        </div>
                    </div>
                </div>

                <br /><h3>Social Links</h3><br />

                <div className="contact2">
                    <div class="grid-container grid-buttons">
                        <div class="grid-item   ">
                            <a href="/setup/Youtube"><img src="https://play-lh.googleusercontent.com/lMoItBgdPPVDJsNOVtP26EKHePkwBg-PkuY9NOrc-fumRtTFP4XhpUNk_22syN4Datc" alt="Facebook" /></a>
                            <a href="/setup/Instagram"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="Facebook" /></a>
                            <a href="/setup/Threads"><img src="https://seeklogo.com/images/T/threads-logo-E9BA734BF6-seeklogo.com.png?v=638252100960000000" alt="Facebook" /></a>
                            <a href="/setup/Twiter"><img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png" alt="Facebook" /></a>
                            <a href="/setup/Facebook"><img src="https://www.facebook.com/images/fb_icon_325x325.png" alt="Facebook" /></a>
                            <a href="/setup/Linkdin"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="Facebook" /></a>
                        </div>
                    </div>
                </div>

                <br /><h3>Payment Links</h3><br />

                <div className="contact2">
                    <div class="grid-container grid-buttons">
                        <div class="grid-item   ">
                            <a href="/setup/Paypal"><img src="https://cdn-icons-png.flaticon.com/512/174/174861.png" alt="Facebook" /></a>
                        </div>
                    </div>
                </div>

            </div>

            {/* <ColorChangingCard/> */}

            <button onClick={handdleSubmit} type="button" className="view_profile">View Profile</button> <br /><br />

        </div>

    );
}

export default Setup;