import {useState} from "react";
import {api} from "../../api.ts";
import {Button, Grid2 as Grid, Input} from "@mui/material";

export default function Chat() {
    interface GptCall {
        id: number;
        query: string | undefined;
        reply: string | undefined;
    }

    const [gptCalls, setGptCalls] = useState<GptCall[]>([]);
    const [conversationStarted, setConversationStarted] = useState(false);

    const handleStartClick = () => {
        api.post(
            "/gptcall/",
            { query: "Ask me a random question. Only show the question. Do not include any introductions or acknowledgements." },
            { headers: { Accept: "application/json" } }
        )
        .then((res) => {
            console.log(res.data);
            setGptCalls([res.data]);
        })
        .catch((err) => console.error(err));
        setConversationStarted(true);
    };

    const handleReplyClick = () => {
        const query = (document.getElementById("queryInput") as HTMLInputElement).value;
        api.post(
            "/gptcall/",
            { query: query },
            { headers: { Accept: "application/json" } }
        )
        .then((res) => {
            console.log(res.data);
            setGptCalls([...gptCalls, res.data]);
        })
        .catch((err) => console.error(err));
    }

    return (
        <>
            <Grid size={12}>
                {!conversationStarted && <Button onClick={handleStartClick}>
                    Click Here
                </Button>}
                {conversationStarted && <>
                    {gptCalls.map((gptCall) => (
                        <div key={gptCall.id}>
                            <p>{gptCall.query}</p>
                            <p>{gptCall.reply}</p>
                        </div>
                    ))}
                    <Input id={"queryInput"}></Input>
                    <Button onClick={handleReplyClick}>reply</Button>
                </>}
            </Grid>
        </>
    );
}