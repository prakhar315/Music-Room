import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { API_BASE_URL } from "../config";


function RoomJoinPage(){
    console.log(API_BASE_URL);
    const [roomCode,setRoomCode] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleTextField=(e)=>{
        setRoomCode(e.target.value);
        setError("");
    };
    const handleJoinRoomButton = async()=>{
        try{
            const requestOptions ={
                method : "POST",
                headers: {"Content-Type":"application/json",},
                credentials :"include",
                body: JSON.stringify({code: roomCode,})
            };
            const response = await fetch(`${API_BASE_URL}/join-room`,requestOptions);
            if(response.ok){
                navigate("/room/"+roomCode);
            }else{
                setError("Room not found.");
            }
        }catch(error){
            console.log(error);
        }
    };

    return(
        <Box sx={{maxWidth:600,mx:"auto",mt:20,border:'1px dashed pink',p:2}}>
        <Grid container spacing={1}>
            <Grid size={12} sx={{textAlign:'center'}}>
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid size={12} sx={{textAlign:'center'}}>
            <TextField
            label = "Code"
            placeholder="Enter the room code"
            value={roomCode}
            error={Boolean(error)}
            helperText={error}
            variant="outlined"
            onChange={handleTextField}
             sx={{
                input: {color: "white",},"& .MuiInputLabel-root": {color: "white",},
                }}
            />
            </Grid>
            <Grid size={12} sx={{textAlign:'center'}}>
                <Button variant="contained" color="primary" onClick={handleJoinRoomButton}>
                Enter Room
                </Button>
            </Grid>
            <Grid size={12} sx={{textAlig:'center'}}>
                <Button variant="contained" color="secondary" component={Link} to="/">Back</Button>
            </Grid>
        </Grid>
        </Box>
    )
};
export default RoomJoinPage;