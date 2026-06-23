import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiPost } from '../../hooks/API_requests';
import '../../css/CompleteProfile.css';
import Errors from '../common/Errors';
import Input from '../common/Input';

export default function CompleteProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, password } = location.state || {};
    const [showError, setShowError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        phone: '',
        website: '',
        companyName: '',
        catchPhrase: '',
        bs: ''
    })

    const validateInput = () => {
        if (!formData.name || formData.name.trim().length < 2) {
            setShowError('שם מלא חייב להכיל לפחות 2 תווים');
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            setShowError('כתובת אימייל לא תקינה');
            return false
        }
        const phoneRegex = /^[0-9]{9,10}$/;
        if (!formData.phone || !phoneRegex.test(formData.phone.replace(/[-\s]/g, ''))) {
            setShowError('מספר טלפון חייב להכיל 9-10 ספרות');
            return false
        }
        if (!formData.street || formData.street.trim().length < 2) {
            setShowError('רחוב חייב להכיל לפחות 2 תווים');
            return false
        }
        if (!formData.city || formData.city.trim().length < 2) {
            setShowError('עיר חייבת להכיל לפחות 2 תווים');
            return false
        }
        const zipcodeRegex = /^[0-9]{5,7}$/;
        if (!formData.zipcode || !zipcodeRegex.test(formData.zipcode)) {
            setShowError('מיקוד חייב להכיל 5-7 ספרות');
            return false
        }
        return true
    };

    async function completeProfile(e) {
        e.preventDefault();
        if (validateInput()) {
            const newUser = {
                name: formData.name,
                username: username,
                email: formData.email,
                address: {
                    street: formData.street,
                    suite: formData.suite,
                    city: formData.city,
                    zipcode: formData.zipcode,
                    geo: { lat: "0", lng: "0" }
                },
                phone: formData.phone,
                website: password,
                company: {
                    name: formData.companyName,
                    catchPhrase: formData.catchPhrase,
                    bs: formData.bs
                }
            };

            try {
                const createdUser = await apiPost('/users', newUser);
                const { website, ...userWithoutWebsite } = createdUser;
                localStorage.setItem('currentUser', JSON.stringify(userWithoutWebsite));
                navigate(`/users/${createdUser.id}/home`);
                
            } catch (error) {
                setShowError('שגיאה ביצירת משתמש: ' + error.message);
            }
        }
    }

    return (
        <div className="complete-profile-container">
            <h1 className="complete-profile-title">השלמת פרטים</h1>
            <form className="complete-profile-form">
                <Input name='name' data={formData} setData={setFormData} placeholder='שם מלא' />
                <Input name='email' type='email' data={formData} setData={setFormData} placeholder='אימייל' />
                <Input name='phone' type='tel' data={formData} setData={setFormData} placeholder='טלפון' />
                <Input name='street' data={formData} setData={setFormData} placeholder='רחוב' />
                <Input name='suite' data={formData} setData={setFormData} placeholder='דירה' />
                <Input name='city' data={formData} setData={setFormData} placeholder='עיר' />
                <Input name='zipcode' data={formData} setData={setFormData} placeholder='מיקוד' />
                <Input name='companyName' data={formData} setData={setFormData} placeholder='שם חברה' />
                <Input name='catchPhrase' data={formData} setData={setFormData} placeholder='סלוגן חברה' />
                <Input name='bs' data={formData} setData={setFormData} placeholder='תיאור עסק' />
                <button
                    type="submit"
                    className="complete-profile-button"
                    onClick={(e) => completeProfile(e)} >השלם רישום </button>
            </form>
            <button className="back-button" onClick={() => navigate('/register')}>חזור</button>
            <Errors showError={showError} setShowError={setShowError} />
        </div>
    );
}