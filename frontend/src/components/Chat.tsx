import {useState, useRef, useEffect} from "react";
import {api} from "../../api.ts";
import {Button, Grid2 as Grid} from "@mui/material";
import ChatMessageBox from "./ChatMessageBox.tsx";
import ChatInput from "./ChatInput.tsx";

export default function Chat() {
    interface GptCall {
        id: number | undefined;
        role: "system" | "user" | "assistant";
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
    const [conversationStarted, setConversationStarted] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [gptCalls]);

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

    const handleReplyClick = (message: string) => {
        const userMessage: GptCall = {
            id: undefined,
            role: "user",
            refusal: undefined,
            content: message
        };

        setGptCalls([...gptCalls, userMessage]);

        api.post(
            "/gptcall/",
            { history: [...gptCalls, userMessage] },
            { headers: { Accept: "application/json" } }
        )
        .then((res) => {
            setGptCalls(res.data);
        })
        .catch((err) => console.error(err));
    }

    const chatForm = <>
        <Grid size={12} ref={chatContainerRef} sx={{maxHeight: "60vh", overflowY: "auto" }}>
            {gptCalls.filter((message) => ( message.role != "system" )).map((message, index) => (
                <ChatMessageBox
                    key={index}
                    message={message.content || ""}
                    role={message.role} />
            ))}
        </Grid>
        <Grid size={12}>
            <ChatInput
                onReply={handleReplyClick}
            />
        </Grid>
    </>;

    return (
        <>
            <Grid size={8} offset={2} spacing={2}>
                {!conversationStarted &&
                    <Button onClick={handleStartClick}>Click Here</Button>
                }
                {conversationStarted && chatForm}
            </Grid>
        </>
    );
}