import "./App.css";
import Chat from "./components/Chat.tsx";
import { Grid2 as Grid } from "@mui/material";
import Timer from "./components/Timer.tsx";
import KeyTracker from "./components/KeyTracker.tsx";

function App() {
    return <>
        <Grid container>
            <Grid size={10} spacing={2}>
                <Grid size={2} offset={5} spacing={2}>
                    <Timer />
                </Grid>
                <Grid size={12} spacing={2}>
                    <Chat />
                </Grid>
            </Grid>
            <Grid size={2} spacing={2}>
                <KeyTracker />
            </Grid>
        </Grid>
    </>
}

export default App;
