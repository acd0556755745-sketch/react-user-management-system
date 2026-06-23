import '../../css/Info.css';

export default function Info() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <div className="info-container">
            <h1 className="info-title">פרטים אישיים - {currentUser?.name}</h1>


            <div className="user-info">
                <h3>פרטים אישיים</h3>
                <p><strong>ID:</strong> {currentUser?.id}</p>
                <p><strong>שם מלא:</strong> {currentUser?.name}</p>
                <p><strong>שם משתמש:</strong> {currentUser?.username}</p>
                <p><strong>אימייל:</strong> {currentUser?.email}</p>
                <p><strong>טלפון:</strong> {currentUser?.phone}</p>
                <p><strong>אתר:</strong> {currentUser?.website}</p>
                <h4>כתובת</h4>
                <p><strong>רחוב:</strong> {currentUser?.address?.street}</p>
                <p><strong>דירה:</strong> {currentUser?.address?.suite}</p>
                <p><strong>עיר:</strong> {currentUser?.address?.city}</p>
                <p><strong>מיקוד:</strong> {currentUser?.address?.zipcode}</p>
                <p><strong>קואורדינטות:</strong> {currentUser?.address?.geo?.lat}, {currentUser?.address?.geo?.lng}</p>
                <h4>חברה</h4>
                <p><strong>שם חברה:</strong> {currentUser?.company?.name}</p>
                <p><strong>סלוגן:</strong> {currentUser?.company?.catchPhrase}</p>
                <p><strong>תיאור עסק:</strong> {currentUser?.company?.bs}</p>
            </div>
        </div>
    );
}