import * as React from 'react';
import { Button } from "../components/ui/atoms/Button";
import UploadSongModal from "../components/UploadSongModal";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


// Contains title (Music Gemz), a description, and upload song & scroll buttons
export default function CallToAction() {
    const scrollToSongs = () => {
        window.scroll({
            top: 500,
            behavior: 'smooth'
          });
    }

    return (
        <Box
            sx={{
                pt: 8,
                pb: 6,
            }}
            >
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h1"
                    align="center"
                    gutterBottom
                >
                    Music Gemz
                </Typography>
                <Typography variant="h4" align="center" paragraph>
                    Discover and share music. <br/> Tip artists directly in ethers.
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                <UploadSongModal />
                <Button
                    onClick={scrollToSongs}
                    title="Browse Music"
                    buttonClass="btn-primary"
                    fontWeight="500"
                    fontSize="1.318rem"
                />
                </Stack>
            </Container>
        </Box>
    );
};