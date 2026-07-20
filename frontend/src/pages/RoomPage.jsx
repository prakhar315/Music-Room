import React from "react";
import { useState,useEffect,useRef} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CreateRoomPage from "./CreateRoomPage";
import Grid from "@mui/material/Grid";
import { API_BASE_URL } from "../config";
import { WS_BASE_URL } from "../config";
import MusicPlayer from "./MusicPlayer";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";



function RoomPage(){
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [isHost, setIsHost] = useState(false);
    const [showSettings,setShowSettings] = useState(false);
    const [spotifyAuthenticated,setSpotifyAuthenticated] = useState(false);
    const [song,setSong] = useState({});
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const socketRef = useRef(null);


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
        
        socketRef.current = new WebSocket(`${WS_BASE_URL}/ws/chat/${roomCode}/`);
        socketRef.current.onopen = ()=>{
            console.log("Websocket conneted");
        };
        socketRef.current.onclose = ()=>{
            console.log("Websocket Disconnected");
        };
        socketRef.current.onmessage = (e) =>{
            const data = JSON.parse(e.data);
            setMessages((prevMessages)=>[
                ...prevMessages,
                data.messages,
            ]);
        };


        const interval = setInterval(() => {
        getCurrentSong();
        }, 1000);

        return () => {
            socketRef.current.close();
            clearInterval(interval);
        }
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

    const getCurrentSong = async()=>{
        const requestOptions={
            credentials: "include",
        };
        const response = await fetch(`${API_BASE_URL}/spotify/current-song`,requestOptions);
        if(!response.ok){
            return;
        }
        const data = await response.json();
        setSong(data);
    }

    const sendMessage = ()=>{
        if(!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN ||message.trim()=="")
            {
                return;
            }
        socketRef.current.send(
            JSON.stringify({
                type : "chat.message",
                message:message,
            })
        );
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
        <Box sx={{maxWidth:900, mx:"auto",mt:6,px:2}}>
        <Paper elevation={3} sx={{p:3, borderRadius: 3,}}>
            <Stack spacing={2}>
            <Typography variant="h5">Room code : {roomCode}</Typography>
            <MusicPlayer {...song} />
            <Paper variant="outlined" sx={{p:2,borderRadius:2,}}>
            <Typography variant="body1">Votes to Skip : {votesToSkip}</Typography>
            <Typography variant="body1">Guest Can Pause : {guestCanPause? "Yes" : "No"}</Typography>
            <Typography variant="body1">Are You Host : {isHost ? "Yes" : "No"}</Typography>
            </Paper>
            <Stack direction="row" spacing={2}>
            {isHost?(
            <Button variant="contained" color="success" size="small" onClick={showSettingPage}>Settings</Button>
            ):null}
            <Button variant="contained" color="info" size="small" onClick={leaveButton}>Leave Room</Button>
            </Stack>     
        </Stack>
        </Paper>
        <Paper elevation={3} sx={{mt: 3,p: 3,borderRadius: 3,}}>
        <Typography variant="h5">
        Let's Chat
        </Typography>
        <Paper variant="outlined" sx={{mt:2, height:300,p:2,overflow:"auto",}}>
            {messages.map((msg,index)=>(
                <Typography key={index} variant="body1">
                    {msg}
                </Typography>
            ))}

        </Paper>
        </Paper>
        </Box>
    )
}
export default RoomPage;