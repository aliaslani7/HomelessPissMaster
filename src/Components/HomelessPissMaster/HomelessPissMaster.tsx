import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import HomelessPic from '../../assets/images/Homeless.jpg'
import { yellow } from "@mui/material/colors";
const HomelessPissMaster = () => {
    return (
        <Box width={"100vw"} height={"100vh"} bgcolor={yellow[100]} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2} padding={2} margin={0} >
            <Typography>HomelessPissMaster</Typography>
            <Box>
                <Typography variant="h2">0</Typography>
            </Box>
            <Box width={300}>
                <img
                    style={{
                        width: "100%",
                        filter: "contrast(1.2) brightness(1.1)",
                        mixBlendMode: "multiply"
                    }}
                    src={HomelessPic}
                    alt="Homeless"
                />
            </Box>
            <ButtonGroup>
                <Button>start</Button>
                <Button>stop</Button>
                <Button>reset</Button>
            </ButtonGroup>
        </Box>
    );
}

export default HomelessPissMaster;