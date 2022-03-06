import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from "../components/ui/assets/logo.png"

export default function Footer() {
    return (
        <Box sx={{ bgcolor: "#DE0050", p: 1 }} component="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Thanks for using Music Gemz!
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                component="p"
            >
                Made with love by Gary, Sid, Grant &#38; Eydrent.
            </Typography>
            <img src={logo} style={{display:"block", marginLeft:"39vw", marginRight:"20vw", width:"25%"}}/>
      </Box>
    );
}