import "./App.css";
import Chat from "./components/Chat.tsx";
import {
    Grid2 as Grid,
} from "@mui/material";

function App() {
    return <>
        <Grid container spacing={2} justifyContent="center">
            <Chat />
        </Grid>
    </>
}

export default App;
