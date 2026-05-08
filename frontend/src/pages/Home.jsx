import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/api';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }

    // Decode token to get user info (basic decoding)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        email: payload.email,
        id: payload.Id,
      });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  if (loading) {
    return <div className="home-container"><p>Loading...</p></div>;
  }

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>🎵 Musicfy</h1>
        </div>
        <div className="navbar-menu">
          <a href="/" className="nav-link active">Home</a>
          <a href="/explore" className="nav-link">Explore</a>
          <a href="/profile" className="nav-link">Profile</a>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <div className="home-content">
        <div className="welcome-section">
          <h2>Welcome to Musicfy! 🎶</h2>
          <p>Hello, {user?.email}</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h3>Stream Music</h3>
            <p>Listen to millions of songs from your favorite artists</p>
            <button className="btn-feature">Start Streaming</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📻</div>
            <h3>Create Playlist</h3>
            <p>Build custom playlists and share them with friends</p>
            <button className="btn-feature">Create Now</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎤</div>
            <h3>Become Artist</h3>
            <p>Share your music with millions of listeners</p>
            <button className="btn-feature">Upload Music</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Your Favorites</h3>
            <p>Save and manage all your favorite tracks</p>
            <button className="btn-feature">View Favorites</button>
          </div>
        </div>

        <div className="recommended-section">
          <h3>Recommended for You</h3>
          <div className="playlist-grid">
            <div className="playlist-item">
              <div className="playlist-image">🎸</div>
              <h4>Rock Hits</h4>
              <p>Best rock songs of all time</p>
            </div>
            <div className="playlist-item">
              <div className="playlist-image">🎹</div>
              <h4>Piano Melodies</h4>
              <p>Peaceful piano music</p>
            </div>
            <div className="playlist-item">
              <div className="playlist-image">🎺</div>
              <h4>Jazz Vibes</h4>
              <p>Smooth jazz collection</p>
            </div>
            <div className="playlist-item">
              <div className="playlist-image">🎧</div>
              <h4>Chill Mix</h4>
              <p>Relaxing beats</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2026 Musicfy. All rights reserved.</p>
      </footer>
    </div>
  );
}
