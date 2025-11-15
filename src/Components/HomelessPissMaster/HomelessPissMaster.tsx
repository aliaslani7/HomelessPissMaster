import { Box, Button, ButtonGroup, Typography, Alert, Snackbar } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Homeless from "../../assets/images/Homeless.jpg";
import { yellow } from "@mui/material/colors";

const HomlessPissMatser = () => {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(33 * 60);
    const [showAlert, setShowAlert] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setCount(prevCount => prevCount + 1);
                        setShowAlert(true); // Show alert when counter increases
                        return 33 * 60;
                    }
                    return prev - 1;
                });
            }, 1000); // Update every second
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setCount(0);
        setTimeLeft(33 * 60);
    };

    const handleManualIncrement = () => {
        setCount(prev => prev + 1);
        setTimeLeft(33 * 60);
        setShowAlert(true); // Show alert for manual increment too
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <Box bgcolor={yellow[100]} width={"100vw"} height={"100vh"}>
            <Box display={"flex"} flexDirection={"column"} alignContent={"center"} alignItems={"center"} justifyContent={"center"} height={"100%"} padding={2}>
                <Typography variant="h4" gutterBottom>
                    Homeless Piss Master
                </Typography>


                <Typography variant="h2" color="primary" fontWeight="bold" marginY={2}>
                    {count}
                </Typography>


                <Typography variant="h6" marginBottom={2}>
                    Time until next count: {formatTime(timeLeft)}
                </Typography>


                <Typography variant="body1" color={isRunning ? "success.main" : "error.main"} marginBottom={2}>
                    Status: {isRunning ? "Running" : "Stopped"}
                </Typography>

                <Box width={400} marginTop={2} marginBottom={3}>
                    <img
                        src={Homeless}
                        alt="Homeless"
                        style={{
                            maxWidth: '100%',
                            height: 'auto',
                            filter: "contrast(1.2) brightness(1.1)",
                            mixBlendMode: "multiply"
                        }}
                    />
                </Box>


                <ButtonGroup variant="contained" size="large" sx={{ marginBottom: 2 }}>
                    <Button onClick={handleStart} disabled={isRunning} color="success">
                        Start
                    </Button>
                    <Button onClick={handleStop} disabled={!isRunning} color="warning">
                        Stop
                    </Button>
                    <Button onClick={handleReset} color="error">
                        Reset
                    </Button>
                </ButtonGroup>


                <Button variant="outlined" onClick={handleManualIncrement} size="large">
                    Manual Count (+1)
                </Button>

                {/* Alert for completed cycle */}
                <Snackbar
                    open={showAlert}
                    autoHideDuration={4000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        variant="filled"
                        severity="success"
                        onClose={handleCloseAlert}
                    >
                        🎉 Homeless Piss cycle completed! Count: {count}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}

export default HomlessPissMatser;