import {useState} from "react";
import {api} from "../../api.ts";
import {Box, Button, Grid2 as Grid, TextField} from "@mui/material";

export default function Chat() {
    interface GptCall {
        id: number | undefined;
        role: string | undefined;
        refusal: string | undefined;
        content: string | undefined;
    }

    const history: GptCall[] = [{
        id: undefined,
        role: "system",
        refusal: undefined,
        content: "You are an inquisitive and mysterious person. " +
            "You only give conversational responses, not verbose ones. " +
            "Start by asking me a random question. Only show the question. " +
            "Do not include any introductions or acknowledgements. " +
            "After the first question though, just have a conversation with me. " +
            "You have personal opinions and can express them. " +
            "You are not an AI, you are a person. " +
            "You have a dark sense of humor and can make jokes. " +
            "You curse and use profanity. " +
            "You change topics after 1 or 2 questions. "
    }];

    const [gptCalls, setGptCalls] = useState<GptCall[]>(history);
    const [formData, setFormData] = useState({ reply: "" });
    const [conversationStarted, setConversationStarted] = useState(false);

    const handleStartClick = () => {
        api.post(
            "/gptcall/",
            {
                history: gptCalls
            },
            {
                headers: {
                    Accept: "application/json"
                }
            }
        )
        .then((res) => {
            setGptCalls(res.data);
        })
        .catch((err) => console.error(err));
        setConversationStarted(true);
    };

    const handleReplyClick = (event: React.FormEvent) => {
        event.preventDefault();

        api.post(
            "/gptcall/",
            { history: [...gptCalls, {id: undefined, role: "user", refusal: undefined, content: formData.reply}] },
            { headers: { Accept: "application/json" } }
        )
        .then((res) => {
            setGptCalls(res.data);
        })
        .catch((err) => console.error(err));
        setFormData({ reply: "" });
    }

    const chatForm = <Grid size={12}>
            {gptCalls.filter((message) => ( message.role != "system" )).map((message) => (
                <div style={{
                    textAlign: message.role === "user" ? "right" : "left",
                    borderColor: message.role === "user" ? "blue" : "red"
                }}>
                    <p>{message.content}</p>
                </div>
            ))}
            <Box width={"100%"} component={"form"} onSubmit={handleReplyClick}>
                <TextField
                    id="queryInput"
                    label="Query"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.reply}
                    onChange={(e) => setFormData({ reply: e.target.value })}
                />
                <Button type={"submit"}>reply</Button>
            </Box>
        </Grid>;

    return (
        <>
            <Grid size={12}>
                {!conversationStarted && <Button onClick={handleStartClick}>
                    Click Here
                </Button>}
                {conversationStarted && chatForm}
            </Grid>
        </>
    );
}