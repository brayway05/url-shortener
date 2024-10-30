import axios from 'axios';

const shortenUrl = async (url: string) => {
    if (url) {
        try {
            const response = await axios.post('http://localhost:3000/shorten', { url });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response?.data || { error: 'An unexpected error happened' };
            } else {
                console.error('Unexpected error:', error);
                return { error: 'An unexpected error occurred' };
            }
        }
    }
    return { error: 'URL is required' };
}

export default {
    shortenUrl
};