import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateRoomPage from "./pages/CreateRoomPage"
import RoomJoinPage from "./pages/RoomJoinpage"
import RoomPage from "./pages/RoomPage";

function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<HomePage/>}/>
      <Route path="/create" element = {<CreateRoomPage/>}/>
      <Route path = "/join" element = {<RoomJoinPage/>}/>
      <Route path="/room/:roomCode" element={<RoomPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
