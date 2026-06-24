import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { API_BASE_URL } from "../config";



function MusicPlayer(props){
const skipSong = async()=>{
    const requestOptions = {
        method: "POST",
        headers : {"Content-Type":"application/json"},
        credentials:"include",
    }
    await fetch(`${API_BASE_URL}/spotify/skip`,requestOptions);
}
const pauseSong = async()=>{
    const requestOptions={
        method:"PUT",
        headers : {"Content-Type":"application/json"},
        credentials:"include",
    }
    await fetch(`${API_BASE_URL}/spotify/pause`,requestOptions);
}
const playSong = async()=>{
    const requestOptions={
        method:"PUT",
        headers: {"Content-Type":"application/json"},
        credentials:"include",
    }
    await fetch (`${API_BASE_URL}/spotify/play`,requestOptions);
}
const songProgress = props.time/props.duration*100;
return(
    <Card>
        <Grid container>
            <Grid size={4}>
                <img src={props.image_url} height="100%" width="100%"/>
            </Grid>
            <Grid size={8}>
                <Typography component="h5" variant="h5">{props.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{props.artist}</Typography>
                <div>
                    <IconButton
                    sx={{color: "#1DB954"}}
                    onClick={()=>{
                        props.is_playing ? pauseSong() :playSong();
                    }}>
                        {props.is_playing ? <PauseIcon/> : <PlayArrowIcon/>}
                    </IconButton>
                    <IconButton onClick={()=>{skipSong();}}>
                    {props.votes}/{props.votes_required}
                    <SkipNextIcon/>
                    </IconButton>
                </div>
            </Grid>
        </Grid>
         <LinearProgress variant="determinate" value={songProgress}/>
    </Card>
);
};
export default MusicPlayer;