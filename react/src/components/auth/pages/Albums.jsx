import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useResource from '../../hooks/useResource';
import Errors from '../common/Errors';
import AddContent from '../common/AddContent';
import Search from '../common/Search';
import useSearch from '../../hooks/useSearch';
import '../../css/Albums.css';
import EditContent from '../common/EditContent';
import useAuth from '../../hooks/useAuth'

export default function Albums() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { data: albums, fetchAll, update, create, remove, error, setError } = useResource('/albums', { userId });
    const [searchConfig, setSearchConfig] = useState({
        searchBy: 'title',
        searchTerm: ''
    });
    const isAuthorized = useAuth(userId);

    useEffect(() => {
        fetchAll();
    }, []);
    const filteredAlbums = useSearch(albums, searchConfig);

    if (!isAuthorized) return null;

    return (
        <div className="albums-container">
            <button onClick={() => navigate(`/users/${userId}/home`)}>חזרה</button>
            <h1>Albums</h1>
            <Errors showError={error} setShowError={setError} />
            <AddContent fields={[{ name: 'title', placeholder: 'אלבום חדש' }]}
                onCreate={(data) => create({ userId: Number(userId), title: data.title })}
            />
            <Search onChange={setSearchConfig} />
            <ul className="albums-list">
                {filteredAlbums.map(album => (
                    <li key={album.id} className="album-item">
                        <Link to={`/users/${userId}/albums/${album.id}/photos`} className="album-link">
                            <strong>ID:</strong> {album.id} | {album.title}</Link>
                        <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); remove(album.id); }}> מחק</button>
                        <EditContent item={album}
                            fields={[{ name: 'title', placeholder: 'כותרת' }]}
                            onUpdate={update} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
