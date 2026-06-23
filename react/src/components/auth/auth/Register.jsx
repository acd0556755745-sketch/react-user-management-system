import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiGet } from '../../hooks/API_requests';
import Errors from '../common/Errors';
import Input from '../common/Input';
import '../../css/Auth.css';


export default function Register() {
    const navigate = useNavigate();
    const [showError, setShowError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        verifyPassword: ''
    });

    const validateInput = () => {
        if (!formData.username.trim() || !formData.password.trim() || !formData.verifyPassword.trim()) {
            setShowError('אנא מלא את כל השדות');
            return false;
        }
        if (formData.password !== formData.verifyPassword) {
            setShowError('הסיסמאות לא תואמות');
            return false;
        }
        return true;
    };

    async function register(e) {
        e.preventDefault();
        if (!validateInput()) {
            return;
        }
        try {
            const data = await apiGet('/users', { username: formData.username });

            if (data && Array.isArray(data) && data.length > 0) {
                setShowError('קיים משתמש עם השם הזה');
            } else {
                navigate('/complete-profile', {
                    state: { username: formData.username, password: formData.password }
                });
            }
        } catch (error) {
            setShowError('הייתה בעיה עם הפעולה: ' + error.message);
        }
    }


    return (
        <div className="login-container">
            <h1 className="login-title">הרשמה</h1>
            <form className="login-form">
                <Input name='username' data={formData} setData={setFormData} placeholder='שם משתמש' />
                <Input name='password' type='password' data={formData} setData={setFormData} placeholder='סיסמה' />
                <Input name='verifyPassword' type='password' data={formData} setData={setFormData} placeholder='אימות סיסמה' />
                <button type="button" className="login-button" onClick={(e) => register(e)}>הרשמה</button>
            </form>
            <button className="register-button" onClick={() => navigate('/login')}>התחברות</button>
            <Errors showError={showError} setShowError={setShowError} />
        </div>
    )
}