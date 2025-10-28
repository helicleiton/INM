import React, { useState } from 'react';
import Button from './Button';
import GraduationCapIcon from './icons/GraduationCapIcon';
import { UserRole } from '../types';

interface LoginPageProps {
    onLoginSuccess: (role: UserRole) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (username.toLowerCase() === 'admin' && password === 'admin123') {
            setError('');
            onLoginSuccess('admin');
        } else if (username.toLowerCase() === 'professor' && password === 'vocal123') {
            setError('');
            onLoginSuccess('vocal_teacher');
        } else {
            setError('Usuário ou senha inválidos.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center items-center gap-3 mb-4">
                         <GraduationCapIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                         <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
                           INM Planner
                         </h1>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">Acesso ao painel de gerenciamento</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username-address" className="sr-only">Usuário</label>
                            <input
                                id="username-address"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-100 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Usuário"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Senha</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-slate-100 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Senha"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-center text-sm text-red-500">{error}</p>
                    )}

                    <div>
                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;