import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import Loading from './Loading';
import DialogContent from '@mui/material/DialogContent';

const url = process.env.REACT_APP_SERVER_URL

function EditItem() {
    const navigate = useNavigate();
    const { type } = useParams();
    const [links, addLinks] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [linkTxt, setlinkTxt] = useState("");
    const [loading, setLoading] = useState(false);

    function addLinkToList() {
        let l = {
            type: type.toLowerCase()+""+(links.length+1),
            value: linkTxt
        }
        addLinks([...links, l]);
        setlinkTxt("");
        cancelDialog();
    }

    function cancelDialog() {
        setOpenDialog(false);
    }

    function showDialog() {
        setOpenDialog(true);
    }

    const deleteLink = (index) => {
        const updatedLinks = [...links];
        updatedLinks.splice(index, 1);
        addLinks(updatedLinks);
    }

    useEffect(() => {
        setLoading(true);

        const token = localStorage.getItem('token');
        console.log(token);
        const config = {
            headers: {
                "authtoken": token,
                "Content-Type": "application/json"
            }
        };

        axios.post(url + '/profile/getUrls', {
            type: type
        }, config)
            .then((response) => {
                console.log('Response:', response.data);
                if (response.data.status === true) {
                    setLoading(false);
                    addLinks(response.data.result);
                }
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
                localStorage.setItem('token', '');
                setLoading(false);
                navigate('/');
            });


    },[]);

    const handleSubmit = () => {
        setLoading(true);

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "authtoken": token,
                "Content-Type": "application/json"
            }
        };

        // name, skills, headline, work, location, educaton, links
        axios.post(url + '/profile/addUrls', {
            links: links
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
                localStorage.setItem('token', '');
                setLoading(false);
                navigate('/');
            });
    }

    return (
        <div>
            <Loading open={loading} />
            {
                <Dialog open={openDialog} aria-labelledby="loading-dialog">
                    <DialogContent>
                        <div style={{ padding: '10px', borderRadius: "10px" }}                                >
                            <div style={{ display: "flex" }}>
                                <img style={{ width: "4rem", height: "4rem" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/2057px-Safari_browser_logo.svg.png" alt="Facebook" />
                                <h1 style={{ textAlign: "left", marginLeft: "15px", paddingTop: "10px" }}>{type}</h1>
                            </div>
                            <input value={linkTxt} onChange={v => setlinkTxt(v.target.value)} placeholder="Enter link" style={{ marginTop: "10px", borderColor: "black", borderStyle: "solid", borderWidth: "1px", borderRadius: "5px", height: "2.5rem", width: "95%", paddingLeft: "10px" }} />
                            <button onClick={cancelDialog} style={{ background: "white", borderWidth: "2px", borderStyle: "solid", borderColor: "red", color: "red", borderRadius: "5px", marginTop: "0.5rem", padding: "10px", width: "9rem" }}>Cancel</button>
                            <button onClick={addLinkToList} style={{ background: "blueviolet", color: "white", borderRadius: "5px", padding: "10px", marginLeft: "1rem", width: "9rem" }}>Add</button>
                        </div>
                    </DialogContent>
                </Dialog>
            }
            <div className='onboarding2'>
                <div style={{ marginTop: "1rem" }} className="user-form">
                    <div style={{ display: "flex" }}>
                        <a href="/setup"><img style={{ width: "2.5rem" }} src="https://cdn-icons-png.flaticon.com/512/93/93634.png" alt="User" /></a>
                        <h1 style={{ textAlign: "right", width: "100%" }}>Edit {type}</h1>
                    </div>
                    <div>
                        {
                            links.map((item, index) => (
                                <div style={{ boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.5)', marginTop: '25px', padding: '15px', borderRadius: "10px" }}                                >
                                    <div style={{ display: "flex" }}>
                                        <img style={{ width: "4rem", height: "4rem" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/2057px-Safari_browser_logo.svg.png" alt="Facebook" />
                                        <div style={{ marginLeft: "1rem" }}>
                                            <h3 style={{ textAlign: "left" }}>{type} {index + 1}</h3>
                                            <button onClick={() => deleteLink(index)} style={{ background: "white", borderWidth: "2px", borderStyle: "solid", borderColor: "red", color: "red", borderRadius: "5px", marginTop: "0.5rem", padding: "10px", width: "9rem" }}>Delete link</button>
                                            <button style={{ background: "blueviolet", color: "white", borderRadius: "5px", padding: "10px", marginLeft: "2rem", width: "9rem" }}>Test link</button>
                                        </div>
                                    </div>
                                    <p placeholder="Enter link" style={{ fontSize: "15px", marginTop: "10px", borderColor: "black", borderStyle: "solid", borderWidth: "1px", borderRadius: "5px", padding: "10px", width: "95%", paddingLeft: "10px" }} >{item.value}</p>
                                </div>
                            ))
                        }

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />

                        <div style={{ width: "100%", marginTop: "0px", position: "fixed", bottom: "0rem", backdropFilter: "blur(5px)", paddingBottom: "2rem" }}>
                            <button onClick={showDialog} style={{ width: "13rem", height: "2.5rem", background: "#414141", color: "white", borderRadius: "5px" }} type="submit">Add Link</button>
                            <button onClick={handleSubmit} style={{ marginLeft: "1rem", width: "14.2rem", height: "2.5rem", background: "#414141", color: "white", borderRadius: "5px" }} type="submit">Save</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default EditItem;