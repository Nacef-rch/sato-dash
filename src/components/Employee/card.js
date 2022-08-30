import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from '../../helpers/avatar.helper';
import { URL } from '../../constants/Api.constant';

const Card = ({ name, job, id, grade, image, onClickHandler }) => {
  const itemClicked = () => {
    onClickHandler(id);
  };
  return (
    <ListItem button divider onClick={itemClicked}>
      <ListItemAvatar>
        {image ? (
          <Avatar alt={name} src={URL + image} />
        ) : (
          <Avatar {...stringAvatar(name)} />
        )}
      </ListItemAvatar>
      <ListItemText primary={name} secondary={`${job} | ${grade}`} />
    </ListItem>
  );
};

export default Card;
