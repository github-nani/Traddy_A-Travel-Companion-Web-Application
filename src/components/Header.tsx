import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme, alpha, styled } from '@mui/material/styles';
import type { TypeHeaderProps } from '../@types';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0, 5, 0, 1 ),
  borderRadius: '50px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.20),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(5),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 2, 2, 2),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '80ch',
      '&:focus': {
        width: '90ch',
      },
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 0, 0, 0), 
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start', 
  marginLeft: theme.spacing(1), 
}));

const Header = ({ setCoordinates }: TypeHeaderProps) => {
  const theme = useTheme();
  const [autoComplete, setAutoComplete] = useState<any>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const onLoad = (autoC: any) => setAutoComplete(autoC);

  const onPlaceChanged = () => {
    if (autoComplete) {
      if (autoComplete.getPlace().geometry) {
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();
        setCoordinates({ lat, lng });
      } else {
        setShowDialog(true);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.light,
                                      borderRadius: '500px',
                                      height: '100px',
                                      width: '1500px',
                                      marginLeft: '300px',
                                      marginTop: '5px'}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {}
          <Avatar alt="Logo" src="logo.png" sx={{ width: 200, height: 200 }} />
          {/* <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          </Typography> */}

          <Box display="flex" alignItems="center">
            {/* <Typography
              variant="h5"
              noWrap
              sx={{ flexGrow: 1, fontStyle: 'initial' }}
            >
              
            </Typography> */}

            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Here…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>

      <Dialog
        open={showDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Invalid search name'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`The name you entered in the search box is incorrect. Please, select a correct value from the drop-down menu as you type.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Header;
