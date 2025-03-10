import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface RoleGuardProps {
    role: string;
    children: React.ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ role, children }) => {
    const navigation = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    if (user?.role === role) {
        return <>{children}</>;
    }else{
        navigation('/login');
    }

    return null;
};

export default RoleGuard;