# Music Room

Collaborative music room for Spotify control, live chat, and room-based streaming.

## Demo

| Version | Demo |
|---|---|
| Current Version | v1.0 |
| Demo Video | [![Music Room Demo](https://drive.google.com/uc?export=view&id=1kbvv4ocyIP33ii3twQjbshKQpEwsJlsV)](https://drive.google.com/file/d/1KbVQPye3CouwZDVz3QaNEhUAg7DDF758/view?usp=sharing) |

> Click the preview image above to open the full demo video.

---

## About

Music Room is a web app where users can:
- create or join a room
- control Spotify playback from one shared room
- see the current song and room settings
- chat live with everyone in the room

## Tech Stack

- Frontend: React, Vite, Material UI
- Backend: Django, Django REST Framework, Channels, Daphne
- Realtime: WebSockets
- Database: SQLite
- Music API: Spotify Web API

## Project Structure

```text
react-django/
├── backend/music_controller/
│   ├── api_controller/   # room management and core room APIs
│   ├── spotify/          # Spotify auth and playback APIs
│   ├── chat/             # websocket chat consumer and routing
│   ├── music_controller/ # Django project settings
│   ├── manage.py
│   └── .env
└── frontend/
    ├── src/
    │   ├── pages/        # Home, create room, join room, room page
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── config.js
    ├── .env
    ├── package.json
    └── vite.config.js
```

## Setup

### Backend

```bash
cd backend/music_controller
python manage.py migrate
python manage.py runserver
```

Backend runs on: `http://127.0.0.1:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://127.0.0.1:5173`

### Environment

Backend `.env`:

```dotenv
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:8000/spotify/redirect
FRONTEND_URL=http://127.0.0.1:5173
DJANGO_SECRET_KEY=your_django_secret_key
DEBUG=True
```

Frontend `.env`:

```dotenv
VITE_API_URL=http://127.0.0.1:8000
VITE_WS_BASE_URL=ws://127.0.0.1:8000
```

## API Endpoints

### Room Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-room?code=CODE` | Get room details |
| POST | `/create-room` | Create a room |
| POST | `/join-room` | Join a room |
| GET | `/user-in-room` | Get current room code |
| POST | `/leave-room` | Leave the room |
| PATCH | `/update-room` | Update room settings |

### Spotify Control

| Method | Endpoint | Description |
|---|---|---|
| GET | `/spotify/get-auth-url` | Get Spotify auth URL |
| GET | `/spotify/redirect` | Spotify callback |
| GET | `/spotify/is-authenticated` | Check auth state |
| GET | `/spotify/current-song` | Get current song |
| PUT | `/spotify/pause` | Pause playback |
| PUT | `/spotify/play` | Resume playback |
| POST | `/spotify/skip` | Skip song |

## Features

### Done

- Room management
- Chat together
- Music room

### Planned

- Youtube watch together

## Usage

1. Start backend and frontend.
2. Open `http://127.0.0.1:5173`.
3. Create or join a room.
4. Authenticate Spotify if needed.
5. Use chat and playback controls in the room.

## Notes

- Session-based room identity is used for now.
- Frontend and backend should both use `127.0.0.1` locally.

## License

MIT
