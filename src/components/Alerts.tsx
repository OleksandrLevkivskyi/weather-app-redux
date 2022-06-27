import React, {FC} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
    margin: '0 auto',
    width: '100%',
    bgcolor: 'red',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
  };

interface AlertProps {
    message: string
}

export function alertComponent(): FC<AlertProps> {
    return ({message}) =>
        message
            ? <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {message}
                    </Typography>
                </Box>
            : null;
}

export const Alert = alertComponent();