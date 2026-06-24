import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Link, Navigate, useNavigate} from "react-router-dom"
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';


function HomePage(){
    const [roomCode,setRoomCode] = useState(null)
    const navigate = useNavigate();


    useEffect(()=>{
        const getUserRoom = async() =>{           
            const response = await fetch(`${API_BASE_URL}/user-in-room`,{credentials:'include'},);
            const data = await response.json();
            setRoomCode(data.code);
            if(data.code !=null ){
                navigate('/room/'+data.code);
            }
        };     
        getUserRoom();
    },[]);

    return(
        
        <Box sx={{maxWidth:600,mx:"auto",mt:20}}>
        <div>
            <h1>Music Room</h1>
            <div className='center'>
            <Stack direction= "column" spacing ={2}>
         <Button variant = "contained" color='primary' to = "/join" component = {Link}>Join Room</Button>
         <Button variant = "contained" color='secondary' to = "/create" component = {Link}>Create Room</Button>
            </Stack>
            </div>

        </div>
        </Box>
    )
}
export default HomePage;