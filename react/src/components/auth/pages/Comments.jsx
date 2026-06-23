import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useResource from '../../hooks/useResource';
import AddContent from '../common/AddContent';
import Errors from '../common/Errors';
import '../../css/Comments.css';
import EditContent from '../common/EditContent';
import useAuth from '../../hooks/useAuth'

export default function Comments() {
    const { userId, postId } = useParams();
    const navigate = useNavigate();
    const { data: post, fetchAll: fetchPost } = useResource(`/posts/${postId}`);
    const { data: comments, fetchAll: fetchComments, create, update, remove, error, setError } = useResource('/comments', { postId });
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAuthorized = useAuth(userId);

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, []);

    if (!isAuthorized) return null;

    return (
        <div className="comments-container">
            <button onClick={() => navigate(`/users/${userId}/posts`)}>⬅ חזרה</button>
            <Errors showError={error} setShowError={setError} />
            {post && (
                <div className="post-preview">
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            )}
            <h2>תגובות</h2>
            <AddContent
                fields={[{ name: 'body', placeholder: 'תגובה חדשה' }]}
                onCreate={(data) => create({ postId: Number(postId), email: currentUser.email, body: data.body })}
            />
            <ul className="comments-list">
                {comments.map(comment => (
                    <li key={comment.id}>
                        <p>{comment.body}</p>
                        <small>{comment.email}</small>
                        {comment.email === currentUser.email && (
                            <>
                                <EditContent
                                    item={comment}
                                    fields={[{ name: 'body', placeholder: 'תגובה' }]}
                                    onUpdate={update}
                                />
                                <button onClick={() => remove(comment.id)}>מחק</button>
                            </>
                        )}
                    </li>
                ))}

            </ul>
        </div>
    );
}
