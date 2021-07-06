export const FRONT_URL = () => {
    if(process.env.NODE_ENV === 'development') {
        return "http://localhost:3002";
    }
    return "http://localhost:3001"
};
export const API_URL = "http://localhost:3001";