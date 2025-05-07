import "./App.css";
import Chat, {ChatMode} from "./components/Chat.tsx";
import {Button, Grid} from "@mui/material";
import {useState} from "react";

function App() {
    const [chatStarted, setChatStarted] = useState(false);
    const [numberOfQuestionsAsked, setNumberOfQuestionsAsked] = useState(0);
    const [score, setScore] = useState(0);
    const [chatMode, setChatMode] = useState<ChatMode>(ChatMode.Chat);

    const handleStartClick = (mode: ChatMode) => {
        setChatMode(mode);
        setChatStarted(true);
    };

    return <>
        <Grid container size={12} spacing={2} height={"100%"} margin={"none"}>
            {chatStarted ? <Grid container size={12} spacing={2}>
                <Chat
                    mode={chatMode}
                    numberOfQuestions={numberOfQuestionsAsked}
                    setNumberOfQuestions={setNumberOfQuestionsAsked}
                    score={score}
                    setScore={setScore}
                />
            </Grid> : <Grid container size={12} justifyContent={"center"} alignItems={"middle"}>
                <Grid size={6}>
                    <Button sx={{height: "100%", width: "100%"}} onClick={() => handleStartClick(ChatMode.Trivia)}>Play Trivia</Button>
                </Grid>
                <Grid size={6}>
                    <Button sx={{height: "100%", width: "100%"}} onClick={() => handleStartClick(ChatMode.Chat)}>Talk to a Stranger</Button>
                </Grid>
            </Grid>}
        </Grid>
    </>
}

export default App;
