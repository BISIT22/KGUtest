import React, { useEffect, useState } from 'react';

const AdminPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Prefill demo credentials only on first render
    useEffect(() => {
        setUsername('demoUser');
        setPassword('demoPass');
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Logic to handle login
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminPage;