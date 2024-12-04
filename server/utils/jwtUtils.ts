const jwt = require('jsonwebtoken');

function decodeToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}


function getTokenFromCookie(cookie: string) {
    if (!cookie) return "";

    const authToken = cookie?.split('; ').find(row =>
        row.startsWith('auth_token='))?.split('=')[1] || " " ;

    return authToken;
}


export function getDecodedToken(cookie: string) {
    try {
        const authToken = getTokenFromCookie(cookie);
        const decodedToken = decodeToken(authToken);
        return decodedToken;
    } catch (error) {
        console.error("Error getting decoded token from cookies.");
    }
}



