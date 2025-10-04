
import React, { useState, useMemo, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import { AuthContext, useAuth } from './hooks/useAuth';
import { User, Role } from './types';
import * as db from './services/databaseService';
import CompanySetupPage from './pages/CompanySetupPage';

const AppContent: React.FC = () => {
    const { user } = useAuth();
    const [companyExists, setCompanyExists] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0); // Used to force re-check of company status

    useEffect(() => {
        setIsLoading(true);
        const company = db.getCompany();
        setCompanyExists(!!company);
        setIsLoading(false);
    }, [refreshKey]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!companyExists) {
        return <CompanySetupPage onSetupComplete={() => setRefreshKey(k => k + 1)} />;
    }
    
    if (!user) {
        return <LoginPage />;
    }

    switch (user.role) {
        case Role.ADMIN:
            return <AdminDashboard />;
        case Role.MANAGER:
            return <ManagerDashboard />;
        case Role.EMPLOYEE:
            return <EmployeeDashboard />;
        default:
            return <LoginPage />;
    }
};

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string): boolean => {
        const users = db.getUsers();
        const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    const updateCurrentUser = (updatedUser: User) => {
        setUser(updatedUser);
        db.updateUser(updatedUser);
    }
    
    const authContextValue = useMemo(() => ({ user, login, logout, updateCurrentUser }), [user]);

    return (
        <AuthContext.Provider value={authContextValue}>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <AppContent />
            </div>
        </AuthContext.Provider>
    );
};

export default App;