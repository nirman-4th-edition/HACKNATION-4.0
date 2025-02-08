import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';

const NotAuthorized: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>403 - Not Authorized</h1>
            <p>You do not have permission to view this page.</p>
            <button onClick={handleGoBack}>
                Go to Home
            </button>
        </div>
    );
};

export default NotAuthorized;