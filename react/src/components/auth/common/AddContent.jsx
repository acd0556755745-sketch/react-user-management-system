import Input from "./Input";
import { useState } from "react"
export default function AddContent(props) {
    const [data, setData] = useState({})
    const add = async () => {
        if (!data[props.fields[0].name]?.trim())
            return;
        await props.onCreate(data);
        setData({});
    };
    return (
        <div className='add'>
            {props.fields.map((field, index) =>
            (<Input key={index}
                name={field.name}
                placeholder={field.placeholder}
                data={data} setData={setData} />))}
            <button onClick={add}>הוסף</button> </div>)
}