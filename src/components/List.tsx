import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect, createRef } from 'react';

import { PlaceDetails } from './';
import type { TypeListProps } from '../@types';

const List = ({
  places,
  childClicked,
  isLoading,
  value,
  setValue,
  rating,
  setRating,
}: TypeListProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: '25px',
               borderRadius: '100px',
               width: '100%',
               height: '100%',
               }}>
      <Typography variant="h1"
      sx = {{fontFamily: 'fantasy',
             fontSize: '40px',
             paddingLeft: '35px'}}>
      all around you👇!!
      </Typography>

      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: '600px' }}
        >
          <CircularProgress size="5rem" />
        </Box>
      ) : (
        <Box sx={{width: '100%', height: '100%'}}>
          <FormControl
            sx={{ margin: `${theme.spacing(2)}`,
                            minWidth: 120,
                            marginBottom: '35px',
                            marginLeft: '30px',
                            }}
          >
            <InputLabel></InputLabel>
            <Select value={value} onChange={(e) => setValue(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{ margin: `${theme.spacing(2)}`,
                          minWidth: 120,
                          marginBottom: '35px',
                          marginLeft: '30px' }}
          >
            <InputLabel></InputLabel>
            <Select value={0} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>No Rating Filter</MenuItem>
              <MenuItem value={3}>Aboce 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} sx={{ height: '75vh', overflow: 'auto' }}>
            {places?.map((place, index) => (
              <Grid item key={index} xs={12}>
                <PlaceDetails place={place} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default List;
