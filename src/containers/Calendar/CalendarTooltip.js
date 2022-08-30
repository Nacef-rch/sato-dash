// import React from 'react'

// const PREFIX = 'Demo';

// const classes = {
//   icon: `${PREFIX}-icon`,
//   textCenter: `${PREFIX}-textCenter`,
//   firstRoom: `${PREFIX}-firstRoom`,
//   secondRoom: `${PREFIX}-secondRoom`,
//   thirdRoom: `${PREFIX}-thirdRoom`,
//   header: `${PREFIX}-header`,
//   commandButton: `${PREFIX}-commandButton`,
// };

// const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(() => ({
//   [`&.${classes.firstRoom}`]: {
//     background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
//   },
//   [`&.${classes.secondRoom}`]: {
//     background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
//   },
//   [`&.${classes.thirdRoom}`]: {
//     background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
//   },
//   [`&.${classes.header}`]: {
//     height: '260px',
//     backgroundSize: 'cover',
//   },
// }));

// const StyledIconButton = styled(IconButton)(() => ({
//   [`&.${classes.commandButton}`]: {
//     backgroundColor: 'rgba(255,255,255,0.65)',
//   },
// }));

// const StyledGrid = styled(Grid)(() => ({
//   [`&.${classes.textCenter}`]: {
//     textAlign: 'center',
//   },
// }));

// const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
//   [`&.${classes.icon}`]: {
//     color: palette.action.active,
//   },
// }));

// const StyledAppointmentTooltipCommandButton = styled(AppointmentTooltip.CommandButton)(() => ({
//   [`&.${classes.commandButton}`]: {
//     backgroundColor: 'rgba(255,255,255,0.65)',
//   },
// }));

// const getClassByLocation = (location) => {
//   if (location === 'Room 1') return classes.firstRoom;
//   if (location === 'Room 2') return classes.secondRoom;
//   return classes.thirdRoom;
// };

// const Header = (({
//   children, appointmentData, ...restProps
// }) => (
//   <StyledAppointmentTooltipHeader
//     {...restProps}
//     className={classNames(getClassByLocation(classes, appointmentData.location), classes.header)}
//     appointmentData={appointmentData}
//   >
//     <StyledIconButton
//       /* eslint-disable-next-line no-alert */
//       onClick={() => alert(JSON.stringify(appointmentData))}
//       className={classes.commandButton}
//       size="large"
//     >
//       <MoreIcon />
//     </StyledIconButton>
//   </StyledAppointmentTooltipHeader>
// ));

// const Content = (({
//   children, appointmentData, ...restProps
// }) => (
//   <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
//     <Grid container alignItems="center">
//       <StyledGrid item xs={2} className={classes.textCenter}>
//         <StyledRoom className={classes.icon} />
//       </StyledGrid>
//       <Grid item xs={10}>
//         <span>{appointmentData.location}</span>
//       </Grid>
//     </Grid>
//   </AppointmentTooltip.Content>
// ));

// const CommandButton = (({
//   ...restProps
// }) => (
//   <StyledAppointmentTooltipCommandButton {...restProps} className={classes.commandButton} />
// ));
