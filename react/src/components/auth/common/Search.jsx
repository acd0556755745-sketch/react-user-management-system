import { useState, useEffect } from "react";

export default function Search({ onChange, includeCompleted }) {
    const [searchBy, setSearchBy] = useState('title');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        onChange({ searchBy, searchTerm });
    }, [searchBy, searchTerm]);

    return (
        <div>
            <label>חיפוש לפי:</label>
            <select value={searchBy} onChange={e => setSearchBy(e.target.value)}>
                <option value="id">ID</option>
                <option value="title">כותרת</option>
                {includeCompleted && (
                    <option value="completed">בוצע (true/false)</option>
                )}
            </select>
            <input
                type="text"
                placeholder="חיפוש..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
    );
}