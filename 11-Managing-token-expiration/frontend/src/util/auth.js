import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const currDate = new Date();
    const duration = expirationDate.getDate() - currDate.getDate();

    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    if(!token) {
        return null;
    }
    const tokenDuration = getTokenDuration();

    if(tokenDuration < 0) {
        // token expired
        return 'EXPIRED';
    }
    
    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

// if not token, will redirect 
export function checkAuthLoader() {
    const token = getAuthToken();

    if(!token) {
        return redirect('/auth');
    }

}