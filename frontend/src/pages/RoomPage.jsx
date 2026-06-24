import React from "react";
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CreateRoomPage from "./CreateRoomPage";
import Grid from "@mui/material/Grid";
import { API_BASE_URL } from "../config";


function RoomPage(){
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [isHost, setIsHost] = useState(false);
    const [showSettings,setShowSettings] = useState(false);
    const [spotifyAuthenticated,setSpotifyAuthenticated] = useState(false);


    const {roomCode} = useParams();
    const navigate = useNavigate();

    const showSettingPage = ()=>{
        setShowSettings(true);

    };

    const closeSettingPage = ()=>{
        setShowSettings(false);
    }

    const getRoomDetails = async()=>{
            try{
                const response = await fetch(`${API_BASE_URL}/get-room?code=`+roomCode,{
                    credentials: "include",
                });
                if(!response.ok){
                    navigate("/");
                }else{
                const data = await response.json();               
                setVotesToSkip(data.vote_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);

                if(data.is_host){
                authenticateSpotify();
                }

                }
                
            } catch(error){
                console.error(error);
            }
        };
        useEffect(() => {
        getRoomDetails();
    }, []);

    const leaveButton=async()=>{
        try{
            const requestOptions ={
                method : "POST",
                headers : {"Content-Type":"application/json",},
                credentials:"include",
            };
            const response = await fetch(`${API_BASE_URL}/leave-room`,requestOptions);
            if(response.ok){
                navigate("/");
            }
        }catch(error){
            console.error(error)
        }
    };

    const authenticateSpotify = async()=>{
        const requestOptions={
            method:"GET",
            credentials:"include",
        };
        const response = await fetch(`${API_BASE_URL}/spotify/is-authenticated`,requestOptions);
        const data = await response.json();
        setSpotifyAuthenticated(data.status);

        if(!data.status){
            const authResponse = await fetch(`${API_BASE_URL}/spotify/get-auth-url`,requestOptions);
            const authData = await authResponse.json();
            window.location.replace(authData.url);
        }
    }

    if(showSettings){
        return(
            <Grid container spacing={1}>
                <Grid size={12} sx={{textAlign:'center'}}>
                <CreateRoomPage
                update={true}
                votesToSkip= {votesToSkip}
                guestCanPause={guestCanPause}
                roomCode = {roomCode}
                updateCallback = {getRoomDetails}
                closeCallback = {closeSettingPage}
            />
                </Grid>
            </Grid>
        );
    }


    return (
        <Box sx={{maxWidth:800, mx:40,mt:10,border:'1px dashed green',height:200}}>
        <div>
            <h3>Room code : {roomCode}</h3>
            <p>Votes to Skip : {votesToSkip}</p>
            <p>
                Guest Can Pause : {guestCanPause.toString()}
            </p>
            <p>
                Are You Host : {isHost.toString()}
            </p>
            {isHost?(
            <Button variant="contained" color="success" size="small" sx={{ml:1}} onClick={showSettingPage}>Settings</Button>
            ):null}
            <Button variant="contained" color="info" size="small" sx={{ml:1}}onClick={leaveButton}>Leave Room</Button>
        </div>
        </Box>
    )
}
export default RoomPage;