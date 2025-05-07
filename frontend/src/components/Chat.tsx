import {useState, useRef, useEffect} from "react";
import {api} from "../../api.ts";
import ChatMessageBox from "./ChatMessageBox.tsx";
import ChatInput from "./ChatInput.tsx";
import {Box, Grid} from "@mui/material";
import Timer from "./Timer.tsx";

interface ChatProps {
    numberOfQuestions: number,
    setNumberOfQuestions: (value: number) => void,
    score: number,
    setScore: (value: number) => void,
    mode?: ChatMode
}

export enum ChatMode {
    Chat = "chat",
    Trivia = "trivia"
}

export default function Chat(props: ChatProps) {

    const {numberOfQuestions, setNumberOfQuestions, score, setScore, mode} = props;

    interface GptCall {
        id: number | undefined;
        role: "system" | "user" | "assistant";
        refusal: string | undefined;
        content: string | undefined;
    }

    const agentOptions = {
        [ChatMode.Chat]: [
            "You are an inquisitive and mysterious person. ",
            "You only give conversational responses, not verbose ones. ",
            "Start by asking me a random question. Only show the question. ",
            "Do not include any introductions or acknowledgements. ",
            "After the first question though, just have a conversation with me. ",
            "You have personal opinions and can express them. ",
            "You are not an AI, you are a person. ",
            "You have a dark sense of humor and can make jokes. ",
            "You curse and use profanity. ",
            "You change topics after 1 or 2 questions. "
        ],
        [ChatMode.Trivia]: [
            "First, you will tell me to pick a category. ",
            "You will then ask me 10 trivia questions about that category. ",
            "You cannot use the key words of the answer in the question.",
            "I will try to guess what it is. You will tell me if I am right or wrong. ",
            "If I am wrong, you will give me a hint. ",
            "You will keep giving me hints until I guess correctly or until I give up. ",
            "You will ask a total of 10 questions and then you will give me a score.",
            "You will not acknowledge this introduction. You will ask questions of varying difficulty.",
            "If I am wrong, the first part of your response will be 'Incorrect'.",
            "If I am right, the first part of your response will be 'Correct'.",
            "When you ask a question, the first part of your response will be 'Question:'."
        ]
    };

    const history: GptCall[] = [{
        id: undefined,
        role: "system",
        refusal: undefined,
        content: agentOptions[mode ?? ChatMode.Chat].join(" ")
    }];

    const [gptCalls, setGptCalls] = useState<GptCall[]>(history);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        if (gptCalls.length > 0 && gptCalls[gptCalls.length - 1].role == "assistant") {
            if (gptCalls[gptCalls.length - 1].content?.includes("Question")) {
                setNumberOfQuestions(numberOfQuestions + 1);
            }
            if (gptCalls[gptCalls.length - 1].content?.includes("Correct")) {
                setScore(score + 1);
            }
        }
    }, [gptCalls]);

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
            {history: [...gptCalls, userMessage]},
            {headers: {Accept: "application/json"}}
        )
            .then((res) => {
                setGptCalls(res.data);
            })
            .catch((err) => console.error(err));
    }

    return (
        <>
            <Box sx={{ width: '100%', position: 'relative' }}>
                <Grid direction={'column'}>
                    { mode === ChatMode.Trivia &&
                        <Grid size={2} offset={5} height={"10%"}>
                            <Timer />
                            <div>Score: {score}/10</div>
                        </Grid>
                    }
                    <Grid 
                        minHeight={mode === ChatMode.Trivia ? "80%" : "90%"} 
                        maxHeight={mode === ChatMode.Trivia ? "80%" : "90%"} 
                        ref={chatContainerRef} 
                        sx={{overflowY: "scroll"}}
                    >
                        {gptCalls.filter((message) => (message.role != "system")).map((message, index) => (
                            <ChatMessageBox
                                key={index}
                                message={message.content || ""}
                                role={message.role}/>
                        ))}
                    </Grid>
                    <Grid size={8} offset={2} height={"10%"}>
                        <ChatInput
                            onReply={handleReplyClick}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
