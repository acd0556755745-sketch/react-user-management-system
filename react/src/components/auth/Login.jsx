import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiGet } from '../../hooks/API_requests';
import '../../css/Auth.css';
import Errors from '../common/Errors';
import Input from '../common/Input';

export default function Login() {
    const navigate = useNavigate();
    const [showError, setShowError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const validateInput = () => {
        if (!formData.username || !formData.password) {
            setShowError('אנא מלא את כל השדות');
            return false
        }
        return true
    }



    async function login(e) {
        e.preventDefault();
        if (validateInput()) {
            try {
                const data = await apiGet('/users', { username: formData.username, website: formData.password });
                if (data && data.length > 0) {
                    const { website, ...userWithoutWebsite } = data[0];
                    localStorage.setItem('currentUser', JSON.stringify(userWithoutWebsite));
                    navigate(`/users/${data[0].id}/home`, { replace: true });
                } else {
                    setShowError('שם משתמש או סיסמה לא נכונים');
                }
            }
            catch (error) {
                setShowError(error.message);
            }
        }
    }



    return (
        <div className="login-container">
            <h1 className="login-title">התחברות</h1>
            <form className="login-form">
                <Input name='username' data={formData} setData={setFormData} placeholder='שם משתמש' />
                <Input name='password' type='password' data={formData} setData={setFormData} placeholder='סיסמה' />
                <button type="button" className="login-button" onClick={(e) => login(e)}>התחברות</button>
            </form>
            <button className="register-button" onClick={() => navigate('/register')}>הרשמה</button>
            <Errors showError={showError} setShowError={setShowError} />
        </div>
    )
}



