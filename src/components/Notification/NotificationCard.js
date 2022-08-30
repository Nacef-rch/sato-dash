import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { Box, Divider, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import IconButton from '@mui/material/IconButton';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const NotificationCard = ({status,sender,approver,dateFrom,dateTo}) => {

  const [expanded, setExpanded] = React.useState(false);
  const [colors,setColors] = React.useState({
    BgColor : '#F9966C',
    TColor:'#F8814F'
  })
  React.useEffect(()=>{
    if(status==='Rejected'){
      setColors({
        BgColor : '#EC645E',
      TColor:'#E24C4C'
      })
    }else if(status === 'Approved'){
      setColors({
        BgColor : '#82C49B',
      TColor:'#2E844E'
      })
    }
  },[])
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ cursor: 'pointer',mb:2 }}>
      <CardContent>
        <Stack direction="row" spacing={1}>
          <Box>
            <Box
              sx={{
                bgcolor: colors.BgColor,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                mt: '12px',
              }}
            >
              <WorkOffIcon
                sx={{
                  color: colors.TColor,
                  width: '25px',
                  height: '25px',
                  ml: '8px',
                  mt: '7px',
                }}
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              Leave Request
            </Typography>
            <Typography variant="body2">
              {status === 'Open' ? (<>
              <strong>{sender}</strong> - Have Send a Leave Request
              </>):'Your submission has been accepted.'}
              
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions disableSpacing sx={{ mt: '-40px', p: 0, pr: 1 }}>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider sx={{ mb: 1 }} />
        <CardContent sx={{ pt: 0, m: 1, mt: 2, mb: 2 }}>
          {status != 'Open' && (
            <Typography variant="body1" sx={{ m: 0, color: '#6b7384' }}>
           
            <strong style={{ color: '#494f5b' }}>Approver :</strong> {approver}
          </Typography>
          )}
          
          <Typography
            variant="subtitle2"
            sx={{ mt: 1, mb: 1, float: 'right', color: '#494f5b' }}
          >
            {dateFrom} - {dateTo}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default NotificationCard;
