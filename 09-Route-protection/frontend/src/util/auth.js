import { redirect } from "react-router-dom";


export function getAuthToken() {
    const token = localStorage.getItem('token');
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