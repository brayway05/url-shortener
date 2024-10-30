import {useState} from "react";
import api from "./api";

function App() {

    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);

    const handleInput = (event) => {
        setUrl(event.target.value);
        setGeneralError(null);
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            if (url) {
                const response = await api.shortenUrl(url);
                if (response.error) {
                    setGeneralError(response.error);
                } else {
                    setShortenedUrl(response);
                    setGeneralError(null);
                }
            }
            setUrl('');
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center mt-3">
                <div className="text-5xl">
                    URL Shortener
                </div>
                <div className="mx-10 mt-10">
                    <div>
                        Input your entire URL to receive a shortened version!
                    </div>
                    <label className="flex mt-5">URL:
                        <input className="block w-full text-sm text-slate-500 border-2 rounded border-gray-500"
                           value={url ?? ''}
                           onChange={handleInput}
                           onKeyDown={handleKeyPress}
                           placeholder="Enter the original URL"
                        />
                    </label>
                    {shortenedUrl && (
                        <p className="mt-5">
                            Shortened URL: <a className="text-blue-600" href={shortenedUrl}>http://localhost:8080/{shortenedUrl}</a>
                        </p>
                    )}
                    {generalError && (
                        <p className="mt-5 text-red-500">{generalError}</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default App
