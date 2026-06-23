import { useNavigate, useParams } from 'react-router-dom';
import Info from './Info';
import '../../css/Home.css';
import { useState, } from 'react';
import useAuth from '../../hooks/useAuth'

export default function Home() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [ShowInfo, setShowInfo] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAuthorized = useAuth(userId);
    if (!isAuthorized) return null;

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login', { replace: true });
    };

    return (
        <div className="home-container">
            <h1 className="home-title">ברוך הבא {currentUser?.name}</h1>
            <div className="nav-buttons">
                <button className="nav-button info-button" onClick={() => setShowInfo(!ShowInfo)}>Info</button>
                <button className="nav-button todos-button" onClick={() => navigate(`/users/${userId}/todos`)}>Todos</button>
                <button className="nav-button posts-button" onClick={() => navigate(`/users/${userId}/posts`)}>Posts</button>
                <button className="nav-button albums-button" onClick={() => navigate(`/users/${userId}/albums`)}>Albums</button>
                <button className="nav-button logout-button" onClick={handleLogout}>Logout</button>
            </div>
            {ShowInfo && <Info />}
        </div>
    )
}