import {useEffect, useState} from "react";
import {Grid2 as Grid, Paper, Typography} from "@mui/material";

export default function Timer() {
    const [startTime] = useState(Date.now());
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsed(Date.now() - startTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    return (
        <Grid size={8} offset={2} spacing={2} height={500}>
            <Paper sx={{ padding: 2 }}>
                <Typography variant="h4">
                    {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
                </Typography>
            </Paper>
        </Grid>
    );
}