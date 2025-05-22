interface UserCredentials {
    username: string
    password: string
}

interface AuthResponse {
    jwt: string
    id: bigint
    username: string
    roles: string[]
}

export const loginUser = async (credentials: UserCredentials): Promise<AuthResponse> => {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
        localStorage.setItem('jwt-response', JSON.stringify(data));
        return data;
    } else {
        const errorMessage = data?.message || 'Invalid username or password';
        throw new Error(errorMessage);
    }
};

export const registerUser = async (credentials: UserCredentials): Promise<AuthResponse> => {
    const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        const errorMessage = data?.message || 'Registration failed';
        throw new Error(errorMessage);
    }
};