import React from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { stringAvatar } from '../../helpers/avatar.helper';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { uploadImage } from '../../+store/Employee/employee.action';
import { URL } from '../../constants/Api.constant';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';

const UserImage = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const collab = useSelector((state) => state.profile.collab[0]);
  const onImageChange = (e) => {
    setImages([...e.target.files]);
  };
  const onSave = () => {
    if (images[0]) {
      let imageData = images[0];
      let imageFile = new FormData();
      if (imageData) {
        imageFile.append('file', imageData);
        dispatch(uploadImage(imageFile, collab.name));
      }
    }
  };
  return (
    <Paper elevation={2} sx={{ borderRadius: '25px', mb: 10 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column ',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          {collab.grade}
        </Typography>
        {isShown && (
          <Avatar
            sx={{
              width: 150,
              height: 150,
              m: 5,
              fontSize: '50px',
              opacity: 1,
              bgcolor: 'rgba(0, 0, 0, 0.208)',
              mb: '-190px',
              zIndex: 99999,
            }}
            onMouseLeave={() => setIsShown(false)}
          >
            <Stack direction="row">
              <IconButton aria-label="upload picture" component="label">
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={onImageChange}
                />
                <PhotoCamera sx={{ color: 'white' }} />
              </IconButton>
              <IconButton
                aria-label="upload picture"
                component="label"
                onClick={onSave}
              >
                <SaveIcon sx={{ color: 'grey' }} />
              </IconButton>
            </Stack>
          </Avatar>
        )}

        {collab.image ? (
          <Avatar
            alt={collab.employee_name}
            src={URL + collab.image}
            sx={{ width: 150, height: 150, m: 5, fontSize: '50px' }}
            onMouseEnter={() => setIsShown(true)}
          />
        ) : (
          <Avatar
            {...stringAvatar(collab.employee_name)}
            sx={{ width: 150, height: 150, m: 5, fontSize: '50px' }}
            onMouseEnter={() => setIsShown(true)}
          />
        )}

        <Typography variant="h4" sx={{ mb: '50px' }}>
          {collab.employee_name}
        </Typography>
      </Box>
    </Paper>
  );
};

export default UserImage;
