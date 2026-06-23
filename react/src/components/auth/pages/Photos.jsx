import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useResource from '../../hooks/useResource';
import useSearch from '../../hooks/useSearch';
import AddContent from '../common/AddContent';
import Search from '../common/Search';
import Errors from '../common/Errors';
import EditContent from '../common/EditContent';
import '../../css/Photos.css';
import useAuth from '../../hooks/useAuth'

const PAGE_SIZE = 6;

export default function Photos() {
  const { userId, albumId } = useParams();
  const navigate = useNavigate();
  const { data: album, fetchAll: fetchAlbum } = useResource(`/albums/${albumId}`);
  const { data: photos, fetchAll: fetchPhotos, create, update, remove, error, setError } = useResource('/photos', { albumId });
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [searchConfig, setSearchConfig] = useState({ searchBy: 'title', searchTerm: '' });
  const isAuthorized = useAuth(userId);
  useEffect(() => {
    fetchAlbum();
    fetchPhotos();
  }, []);

  const filteredPhotos = useSearch(photos, searchConfig);
  const visiblePhotos = filteredPhotos.slice(0, visibleCount);

  if (!isAuthorized) return null;

  return (
    <div className="photos-container">
      <button onClick={() => navigate(`/users/${userId}/albums`)}>⬅ חזרה לאלבומים</button>
      <Errors showError={error} setShowError={setError} />

      {album && <h1>Album: {album.title}</h1>}

        <AddContent fields={[{ name: 'title', placeholder: 'כותרת תמונה' },
            { name: 'url', placeholder: 'קישור לתמונה' }]}
          onCreate={(data) => create({ albumId: Number(albumId), title: data.title, url: data.url })}/>

      <Search onChange={setSearchConfig} />

      <ul className="photos-list">
        {visiblePhotos.map(photo => (
          <li key={photo.id} className="photo-item">
            <img src={photo.url} alt={photo.title} />
            <p>{photo.title}</p>
                <EditContent item={photo} fields={[{ name: 'title', placeholder: 'כותרת תמונה' },
                    { name: 'url', placeholder: 'קישור לתמונה' }]} onUpdate={update}/>
                <button onClick={() => remove(photo.id)}>מחיקה</button>
          </li>
        ))}
      </ul>

      <div className="pagination-buttons">
        {visibleCount < filteredPhotos.length && (
          <button onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>הצג עוד</button>
        )}
        {visibleCount > PAGE_SIZE && (
          <button onClick={() => setVisibleCount(c => Math.max(PAGE_SIZE, c - PAGE_SIZE))}>הצג פחות</button>
        )}
      </div>
    </div>
  );
}
