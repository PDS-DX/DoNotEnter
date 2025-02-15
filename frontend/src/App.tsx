import {useEffect, useState} from 'react';
import { api } from '../api';
import './App.css';

interface GptCall {
    id: number;
    query: string | undefined;
    reply: string | undefined;
}

function App() {
    const [gptCalls, setGptCalls] = useState<GptCall[]>([])

    useEffect(() => {
        api.get('/gptcall/', {
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => setGptCalls(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            {gptCalls.map((gptCall) => (
                <div key={gptCall.id}>
                    <p>{gptCall.query}</p>
                    <p>{gptCall.reply}</p>
                </div>
            ))}
        </>
    )
}

export default App
