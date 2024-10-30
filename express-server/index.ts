import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// storing the URLs in memory
const urls = new Map<string, string>();

const generateShortUrl = () => {
    return Math.random().toString(36).substr(2, 5);
}

app.post('/shorten', (req: Request, res: Response) => {
    const { url } = req.body;

    if (!url) {
        const error = 'URL is required'
        console.log(error);
        res.status(400).json({ error: error });
        return;
    }

    // check if has https:// or http:// before it
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        const error = 'Invalid URL. URL must start with http:// or https://'
        console.log(error);
        res.status(400).json({ error: error });
        return;
    }

    const shortUrl = generateShortUrl();
    if (url) {
        urls.set(shortUrl, url);
        res.send(shortUrl);
    } else {
        const error = 'URL is required';
        console.log(error)
        res.status(404).send({ error: error });
        return;
    }
});

// Redirect to the original URL
// NOTE: this route is hit from a redirect in the vite configuration
app.get('/:shortUrl', (req: Request, res: Response) => {
    const { shortUrl } = req.params;
    const originalUrl = urls.get(shortUrl);

    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        const error = 'URL not found';
        console.log(error);
        res.status(404).json({ error: error });
        return;
    }
});

app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
});