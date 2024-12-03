import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import RouterComponent from './Router';
import { AuthProvider } from './context/AuthProvider';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterComponent />
        </AuthProvider>
    </StrictMode>
);
