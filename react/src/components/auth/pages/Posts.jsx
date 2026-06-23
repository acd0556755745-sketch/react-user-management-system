import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useResource from '../../hooks/useResource';
import Errors from '../common/Errors';
import AddContent from '../common/AddContent';
import Search from '../common/Search';
import useSearch from '../../hooks/useSearch';
import '../../css/Posts.css';
import EditContent from '../common/EditContent';
import useAuth from '../../hooks/useAuth'

export default function Posts() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { data: posts, fetchAll, create, update, remove, error, setError } = useResource('/posts');
    const [searchConfig, setSearchConfig] = useState({ searchBy: 'title', searchTerm: '' });
    const [selectedPostId, setSelectedPostId] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAuthorized = useAuth(userId);
    useEffect(() => {
        fetchAll();
    }, []);
    const [showOnlyMyPosts, setShowOnlyMyPosts] = useState(false);
    const searchedPosts = useSearch(posts, searchConfig);
    const filteredPosts = showOnlyMyPosts
        ? searchedPosts.filter(post => post.userId == currentUser.id)
        : searchedPosts;


    if (!isAuthorized) return null;

    return (
        <div className="posts-container">
            <h1>Posts</h1>
            <button onClick={() => navigate(`/users/${userId}/home`)}>חזרה</button>
            <button onClick={() => setShowOnlyMyPosts(prev => !prev)}>
                {showOnlyMyPosts ? 'הצגת כל הפוסטים' : 'הצגת הפוסטים שלך בלבד'}
            </button>
            <Errors showError={error} setShowError={setError} />
            <AddContent
                fields={[{ name: 'title', placeholder: 'כותרת' }, { name: 'body', placeholder: 'תוכן' }]}
                onCreate={(data) => create({ userId: Number(userId), title: data.title, body: data.body })}
            />
            <Search onChange={setSearchConfig} />
            <ul className="posts-list">
                {filteredPosts.map(post => (
                    <li key={post.id} className={`post-item ${selectedPostId === post.id ? 'selected' : ''}`}>
                        <h3>{post.title}</h3>
                        <p>ID: {post.id}</p>
                        {selectedPostId == post.id && (
                            <>
                                <p className="post-body">{post.body}</p>
                                <button onClick={() => navigate(`/users/${userId}/posts/${post.id}/comments`)}>צפייה בתגובות</button>
                                {currentUser.id == post.userId && (
                                    <EditContent
                                        item={post}
                                        fields={[
                                            { name: 'title', placeholder: 'כותרת' },
                                            { name: 'body', placeholder: 'תוכן' }
                                        ]}
                                        onUpdate={update}
                                    />
                                )}
                            </>
                        )}
                        <button onClick={() => setSelectedPostId(prev => prev === post.id ? null : post.id)}>בחר</button>
                        {currentUser.id == post.userId && <button onClick={() => remove(post.id)}>מחק</button>}
                    </li>
                ))}
            </ul>
        </div >
    );
}
