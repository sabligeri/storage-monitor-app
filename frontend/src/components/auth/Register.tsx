import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/auth";
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setErrorr] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            registerUser({ username, password });
            navigate('/login');
        } catch (error) {
            setErrorr('Registration failed: ' + error);
        }
    }

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    )
}

export default Register;