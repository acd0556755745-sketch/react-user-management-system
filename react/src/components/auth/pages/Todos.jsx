import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useResource from '../../hooks/useResource';
import Errors from '../common/Errors';
import '../../css/Todos.css';
import AddContent from '../common/AddContent';
import Search from '../common/Search';
import useSearch from '../../hooks/useSearch';
import EditContent from '../common/EditContent';
import useAuth from '../../hooks/useAuth'

export default function Todos() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { data: todos, fetchAll, create, update, remove, error, setError } = useResource('/todos', { userId });
    const [sortBy, setSortBy] = useState('id');
    const [searchConfig, setSearchConfig] = useState({ searchBy: 'title', searchTerm: '' });
    const filteredTodos = useSearch(todos, searchConfig);
    const isAuthorized = useAuth(userId);

    useEffect(() => {
        fetchAll()
    }, []);

    const sortTodos = (list, criteria) => {
        return [...list].sort((a, b) => {
            if (criteria === 'id') return a.id - b.id;
            if (criteria === 'title') return a.title.localeCompare(b.title);
            if (criteria === 'completed') return a.completed - b.completed;
            return 0;
        });
    };

    const filteredAndSortedTodos = useMemo(() => {
        const sorted = sortTodos(filteredTodos, sortBy);
        return sorted;
    }, [filteredTodos, sortBy]);

    if (!isAuthorized) return null;

    return (
        <div className="todos-container">
            <h1>Todos</h1>
            <button className="back-button" onClick={() => navigate(`/users/${userId}/home`)}>חזרה</button>
            <Errors showError={error} setShowError={setError} />
            <AddContent
                fields={[{ name: "title", placeholder: "משימה חדשה" }]}
                onCreate={(data) => create({ userId: Number(userId), title: data.title, completed: false })} />
            <div>
                <label>מיון לפי:</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="id">ID</option>
                    <option value="title">כותרת</option>
                    <option value="completed">בוצע</option>
                </select>
            </div>
            <Search includeCompleted onChange={setSearchConfig} />
            <ul className="todos-list">
                {filteredAndSortedTodos.map(todo => (
                    <li key={todo.id}>
                        <p>{todo.id}   {todo.title}</p>
                        <input type="checkbox" checked={todo.completed}
                            onChange={() => update(todo.id, { completed: !todo.completed })} />
                        <EditContent item={todo} fields={[{ name: 'title', placeholder: 'כותרת' }]}
                            onUpdate={update} />
                        <button onClick={() => remove(todo.id)}>מחק</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}