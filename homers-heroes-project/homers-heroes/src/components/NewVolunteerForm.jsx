import React, { useState } from "react";
import axios from "axios";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useSound from 'use-sound'
import HDTheme from '../assets/HDTheme16Seconds.mp3'

const NewVolunteerForm = ({ onSubmit }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [project_id, setProject] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [preferredContact, setPreferredContact] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [playActive] = useSound(HDTheme, { volume: 0.30 })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newVolunteer = {
            firstName,
            lastName,
            project_id,
            phoneNumber,
            emailAddress,
            preferredContact,
        };
        try {
            await axios.post("http://localhost:8080/Volunteers", newVolunteer);
            // console.log(response.data);
            setFirstName("");
            setLastName("");
            setProject("");
            setPhoneNumber("");
            setEmailAddress("");
            setPreferredContact("");
        } catch (error) {
            console.log(error);
        }
        onSubmit();
        alert("Thank You for Volunteering!"), setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const handleShowForm = () => {
        setShowForm(true);
        playActive();
    };

    return (
        <div>
            <button onClick={handleShowForm} id="volunteer-button">
                Volunteer
            </button>
            <Modal open={showForm} onClose={handleCancel} label="volunteer-modal">
                <div className="modal-volunteer">
                    <h2>Volunteer Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            fullWidth
                            margin="normal"
                            required
                            error={firstName !== "" && !firstName.match(/^[a-zA-Z]{1,20}$/)}
                            helperText={
                                firstName !== "" && !firstName.match(/^[a-zA-Z]{1,20}$/)
                                    ? "Please enter a valid name using only letters" : ""
                            }
                            inputProps={{
                                pattern: "[a-zA-Z]+",
                                maxLength: 20,
                            }} />
                        <TextField
                            label="Last Name"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            fullWidth
                            margin="normal"
                            required
                            error={lastName !== "" && !lastName.match(/^[a-zA-Z-]{1,30}$/)}
                            helperText={
                                lastName !== "" && !lastName.match(/^[a-zA-Z-]{1,30}$/)
                                    ? "Please enter a valid name using only letters" : ""
                            }
                            inputProps={{
                                pattern: "[a-zA-Z-]+",
                                maxLength: 30,
                            }} />
                        {/* <FormControl fullWidth margin="normal">
              <InputLabel>Project</InputLabel>
              <Select 
                value={project_id}
                onChange={(event) => setProject(event.target.value)}>
                <MenuItem value={{"project_id": 1, "project_name": "The Big Event", "project_date": "2023-03-05", "project_description": "Helping hands"}}>The Big Event</MenuItem>
                <MenuItem value="2">Hands on Homer</MenuItem>
                <MenuItem value="3">Bake Sale</MenuItem>
              </Select>
            </FormControl> */}
                        <TextField
                            label="Phone Number"
                            required
                            value={phoneNumber}
                            pattern="\d{10}"
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            fullWidth
                            margin="normal"
                            error={phoneNumber !== "" && !phoneNumber.match(/^\d{10}$/)}
                            helperText={phoneNumber !== "" && !phoneNumber.match(/^\d{10}$/)
                                ? "Please Enter a Valid Phone number with no dashes" : ""
                            } />
                        <TextField
                            label="Email Address"
                            value={emailAddress}
                            onChange={(event) => setEmailAddress(event.target.value)}
                            fullWidth
                            margin="normal"
                            required
                            error={
                                emailAddress !== "" && !emailAddress.match(
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                                )
                                    ? "Please enter a valid email address" : ""
                            }
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Preffered Method of Contact</InputLabel>
                            <Select
                                value={preferredContact}
                                onChange={(event) => setPreferredContact(event.target.value)}>
                                <MenuItem value="PHONE">Phone</MenuItem>
                                <MenuItem value="EMAIL">Email</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" style={{ marginRight: 8 }}>
                            Volunteer
                        </Button>
                        <Button onClick={handleCancel} variant="outlined">Cancel</Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default NewVolunteerForm;
