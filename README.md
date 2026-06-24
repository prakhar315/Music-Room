# Music Room

Collaborative Spotify music controller web app. Host creates a room, guests join and vote to skip songs.

---

## About

**Music Controller** is a web application that allows you to:
- Create a room and invite friends to join
- Control Spotify playback (play/pause/skip) from the web interface
- Vote to skip songs (if host allows it)
- View currently playing track with real-time updates

**Tech Stack:**
- Frontend: React 19.2 + Vite 8.0 + Material UI 9.1
- Backend: Django 6.0.6 + Django REST Framework 3.17.1
- Database: SQLite
- API: Spotify Web API
- Other: python-dotenv, requests, django-cors-headers

---

## Setup

### Requirements
- Python 3.13+
- Node.js 18+
- Spotify account with app credentials
- pip & npm

### Backend Dependencies

```
Django==6.0.6
djangorestframework==3.17.1
django-cors-headers==4.9.0
python-dotenv==1.2.2
requests==2.34.2
```

### Backend Setup

```bash
cd backend/music_controller

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# or .venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Setup database
python manage.py migrate

# Create .env file with Spotify credentials
# SPOTIFY_CLIENT_ID=your_client_id
# SPOTIFY_CLIENT_SECRET=your_client_secret
# SPOTIFY_REDIRECT_URI=http://127.0.0.1:8000/spotify/redirect
# FRONTEND_URL=http://localhost:5173
# DJANGO_SECRET_KEY=your_secret_key
# DEBUG=True

# Run server
python manage.py runserver
```

Backend runs on: `http://localhost:8000`

### Frontend Dependencies

```
react@19.2.6
react-dom@19.2.6
react-router-dom@7.17.0
@mui/material@9.1.1
@mui/icons-material@9.1.1
@emotion/react@11.14.0
@emotion/styled@11.14.1
vite@8.0.12
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## Project Structure

```
react-django/
├── backend/music_controller/
│   ├── api_controller/          # Room management & core endpoints
│   │   ├── models.py            # Room model
│   │   ├── views.py             # Room API views
│   │   ├── serializers.py       # Serializers
│   │   └── urls.py              # Routes
│   │
│   ├── spotify/                 # Spotify integration
│   │   ├── models.py            # SpotifyToken, Vote models
│   │   ├── views.py             # Spotify API views
│   │   ├── util.py              # Helper functions
│   │   └── urls.py              # Spotify routes
│   │
│   ├── manage.py
│   ├── db.sqlite3
│   └── .env                     # Environment variables
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── HomePage.jsx              # Landing page
    │   │   ├── CreateRoomPage.jsx        # Create room
    │   │   ├── RoomJoinpage.jsx          # Join room
    │   │   └── RoomPage.jsx              # Room control panel
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── config.js                    # API config
    │
    ├── package.json
    ├── vite.config.js
    └── index.html
```

---

## API Endpoints

### Room Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/rooms` | List all rooms |
| GET | `/get-room?code=CODE` | Get room details |
| POST | `/create-room` | Create new room |
| POST | `/join-room` | Join existing room |
| GET | `/user-in-room` | Get user's current room |
| POST | `/leave-room` | Leave room |
| PATCH | `/update-room` | Update room settings |

### Spotify Control
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/spotify/get-auth-url` | Get Spotify auth URL |
| GET | `/spotify/redirect` | Auth callback |
| GET | `/spotify/is-authenticated` | Check auth status |
| GET | `/spotify/current-song` | Get playing song |
| PUT | `/spotify/pause-song` | Pause playback |
| PUT | `/spotify/play-song` | Resume playback |
| POST | `/spotify/skip-song` | Skip to next song |

---

## Usage

1. **Start Backend & Frontend**
   ```bash
   # Terminal 1
   cd backend/music_controller
   python manage.py runserver
   
   # Terminal 2
   cd frontend
   npm run dev
   ```

2. **Open in Browser**
   - Go to `http://localhost:5173`

3. **Create or Join Room**
   - Click "Create Room" to host or "Join Room" to join
   - Set voting preferences (if hosting)
   - Share room code with friends

4. **Control Spotify**
   - Authenticate with Spotify
   - Play/pause/skip songs
   - Guests can vote to skip (if enabled)

---

## Database Reset

Clear all data:
```bash
cd backend/music_controller
python manage.py flush --no-input
```

Full reset:
```bash
rm db.sqlite3
python manage.py migrate
```

---

## Environment Variables

Create `.env` in `backend/music_controller/`:

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:8000/spotify/redirect
FRONTEND_URL=http://localhost:5173
DJANGO_SECRET_KEY=your_django_secret_key
DEBUG=True
```

Get Spotify credentials from: https://developer.spotify.com/dashboard

---

## Known Issues

- Vote model has unique constraint on user field (allows only 1 vote per user)
- Room host field has unique constraint (host can only create 1 room)
- No song list API endpoint yet
- Spotify token refresh logic needs improvement

---

## Features Planned

- [ ] Song queue/playlist view
- [ ] User profiles
- [ ] Room history
- [ ] Better error handling
- [ ] Token refresh automation

---

## License

MIT
