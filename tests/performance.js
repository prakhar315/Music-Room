import http from "k6/http";
import { check } from "k6";

const BASE_URL = __ENV.BASE_URL;
const ROOM_CODE = __ENV.ROOM_CODE;
const SESSION_ID = __ENV.SESSION_ID;

const params = {
    headers:{
        Cookie:`sessionid=${SESSION_ID}`,
    }
};

export const options={
    vus:1,
    iterations:1,
};

export default function(){
const response = http.get(`${BASE_URL}/user-in-room`);
const roomres = http.get(`${BASE_URL}/get-room?code=${ROOM_CODE}`);
const authres = http.get(`${BASE_URL}/spotify/is-authenticated`,params);
const currentsong = http.get(`${BASE_URL}/spotify/current-song`,params);

console.log(currentsong.status);
console.log(currentsong.body);
console.log(`${BASE_URL}/spotify/current-song`);

check(response,{
    "user in room status 200":(r)=> r.status ===200,
});
check(roomres,{
    "Get room status is 200":(r)=> r.status ===200,
});

check(authres,{
    "auth status is 200": (r)=>r.status===200,
})

check(currentsong,{
    "Current song status is 200":(r)=> r.status===200,
})
};