import {FC, useState} from "react";
import Button, { ButtonProps } from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { lightGreen } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '15ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    marginLeft: '20px',
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[500],
    '&:hover': {
      backgroundColor: lightGreen[700],
    },
  }));

interface LocationSearchProps {
    onSearch: (search: string) => void;
  }

export const LocationSearch: FC<LocationSearchProps> = ({onSearch}) => {
    const [locationSearch, setLocationSearch] = useState('');
    const disableSearch = locationSearch.trim() === '';
    const addLocation = () => {
        onSearch(locationSearch);
        setLocationSearch('');
        console.log(locationSearch)
    };   
    
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          <Typography
              variant="h2"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Weather App
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
            >
              Enter city name and press search button
            </Typography>
            <Search>
              <StyledInputBase
                placeholder="Enter city name"
                inputProps={{ 'aria-label': 'search' }}
                type="text" 
                value={locationSearch}
                onChange={e => setLocationSearch(e.target.value)}
              />
            </Search>
            <ColorButton variant="contained" 
                    color="success"
                    onClick={addLocation} 
                    disabled={disableSearch}>
                Search
            </ColorButton>
          </Toolbar>
        </AppBar>
      </Box>
    );
}