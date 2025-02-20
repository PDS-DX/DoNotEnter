import { api } from '../api';
import './App.css';

interface GptCall {
    id: number;
    query: string | undefined;
    reply: string | undefined;
}

function App() {
    const gptCalls: GptCall[] = [];

    api.post('/gptcall/',
            {
                query: 'What is the capital of France?'
            },
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        )
        .then(res => {
            console.log(res.data);
            gptCalls.push(res.data)
        })
        .catch(err => console.error(err));

    console.log(gptCalls);

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
