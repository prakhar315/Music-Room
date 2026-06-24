import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import { API_BASE_URL } from "../config";


function CreateRoomPage(props){
    const navigate = useNavigate();
    const [guestCanPause,setGuestCanPause] = useState(props.guestCanPause ?? true);
    const [votesToSkip,setVotesToSkip] = useState(props.votesToSkip ?? 2);
    const [errorMsg,setErrorMsg] = useState("");
    const [successMsg,setSuccessMsg] = useState("");

    const title = props.update ? "Update Room" : "Create A Room";
    const actionbutton = props.update ? "update" : "create";
    const backclosebutton = props.update ? "close" : "back";


    const handleVotesChange = (e) =>{
        return setVotesToSkip(Number(e.target.value));
    }

    const handleGuestCanPauseChange = (e) =>{
        return setGuestCanPause(e.target.value === "true")
    }

    const handleCreateRoomButton = async() =>{
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({vote_to_skip: votesToSkip, guest_can_pause: guestCanPause,}),
            credentials:"include",
        };
        try{
            const response = await fetch(`${API_BASE_URL}/create-room`,requestOptions)
            const data = await response.json();
            console.log(data);
            navigate("/room/" + data.code);
        }catch(error){
            console.error(error);
        }
    };

    const handleUpdateRoomButton = async()=>{
        const requestOptions ={
            method: "PATCH",
            headers:{"Content-Type":"application/json"},
            credentials:"include",
            body : JSON.stringify({vote_to_skip:votesToSkip,guest_can_pause:guestCanPause,code:props.roomCode})
        };
        try{
            const response = await fetch(`${API_BASE_URL}/update-room`,requestOptions);
            if(response.ok){
                setSuccessMsg("Room Updated Successfully");
            }else{
                setErrorMsg("Error while Updating the Room");
            }
            if(props.updateCallback){
            props.updateCallback();
            }
        }catch(error){
                console.error(error);
        }     
    };

    return(
        <Box sx={{maxWidth:600,mx:"auto",mt:10,border:'2px solid blue',p:2}}>
        <Grid container spacing={1}>
            <Grid size={12} sx={{textAlign:'center'}}>
                <Collapse in={successMsg != "" || errorMsg!= ""}>
                    {successMsg != "" ?(
                    <Alert severity="success" onClose={()=>{setSuccessMsg("")}}>
                    {successMsg}
                    </Alert>
                    ):(
                    <Alert severity="error" onClose={()=>{setErrorMsg("")}}>
                    {errorMsg}
                    </Alert>         
                    )}
                </Collapse>

            </Grid>
            <Grid size={12} sx={{textAlign: 'center'}}>
                <Typography variant="h4">{title}</Typography>
            </Grid>

            <Grid size={12} sx={{textAlign : 'center'}}>
                <FormControl>
                    <FormHelperText sx={{color:'white',textAlign:'center'}}>
                    Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup row value={guestCanPause.toString()} onChange={handleGuestCanPauseChange} sx={{textAlign:'center'}}>
                        <FormControlLabel value = "true" control={<Radio/>} label="Play/Pause"/>
                        <FormControlLabel value="false" control={<Radio/>} label="No Control"/>
                    </RadioGroup>
                </FormControl>
            </Grid>

            <Grid size={12} sx={{textAlign:'center'}}>
                <FormControl>
                    <TextField type="number" sx={{input:{color:"white",}}} value={votesToSkip} onChange={handleVotesChange} slotProps={{htmlInput:{min:1,},}}/>
                    <FormHelperText sx={{color:"white"}}>Votes Required To Skip The Song</FormHelperText>
                </FormControl>
            </Grid>
            <Grid size={12} sx={{textAlign:'center'}}>          
                <Button
                variant="contained"
                onClick={props.update ? handleUpdateRoomButton : handleCreateRoomButton}>
                {actionbutton}
                </Button>

                {props.update ? (
                <Button variant="contained" color="secondary" sx={{ ml: 1 }} onClick={props.closeCallback}>
                Close
                </Button>
                ):(
                <Button color="secondary" variant="contained" component={Link} to="/" sx={{ ml: 1 }}>
                Back
                </Button>
                )}
                </Grid>   
        </Grid>
        </Box>      
    )
}
 export default CreateRoomPage;