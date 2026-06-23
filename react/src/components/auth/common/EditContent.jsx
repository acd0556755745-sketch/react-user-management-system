import { useState } from "react";
import Input from "./Input";

export default function EditContent({ item, fields, onUpdate }) {
    const [data, setData] = useState(item);

    return (
        <div>
            {fields.map(f => (
                <Input
                    key={f.name}
                    name={f.name}
                    placeholder={f.placeholder}
                    data={data}
                    setData={setData}
                />
            ))}
            <button onClick={() => onUpdate(data.id, { title: data.title, body: data.body, url: data.url })}>עדכון</button>
        </div>
    );
}
