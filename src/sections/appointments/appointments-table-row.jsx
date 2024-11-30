// import PropTypes from 'prop-types';

// import Link from '@mui/material/Link';
// import Avatar from '@mui/material/Avatar';
// import MenuItem from '@mui/material/MenuItem';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import IconButton from '@mui/material/IconButton';
// import ListItemText from '@mui/material/ListItemText';

// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// // ----------------------------------------------------------------------

// export default function AppointmentsTableRow({ row, onEditRow, onDeleteRow }) {
//   const { serial_no, feature_name, logo, feature_type } = row;

//   const popover = usePopover();

//   return (
//     <>
//       <TableRow hover>
//         <TableCell>{serial_no}</TableCell>

//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <Avatar
//             alt={feature_name}
//             src={logo}
//             variant="rounded"
//             sx={{ width: 64, height: 64, mr: 2 }}
//           />

//           <ListItemText
//             disableTypography
//             primary={
//               <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
//                 {feature_name}
//               </Link>
//             }
//           />
//         </TableCell>

//         <TableCell>
//           <Label variant="soft" color="success">
//             {feature_type}
//           </Label>
//         </TableCell>

//         <TableCell>
//           <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         </TableCell>
//       </TableRow>

//       <CustomPopover
//         open={popover.open}
//         onClose={popover.onClose}
//         arrow="right-top"
//         sx={{ width: 140 }}
//       >
//         <MenuItem
//           onClick={() => {
//             onEditRow();
//             popover.onClose();
//           }}
//         >
//           <Iconify icon="solar:pen-bold" />
//           Edit
//         </MenuItem>
//         <MenuItem
//           onClick={() => {
//             onDeleteRow();
//             popover.onClose();
//           }}
//         >
//           <Iconify icon="material-symbols:delete" />
//           Delete
//         </MenuItem>
//       </CustomPopover>
//     </>
//   );
// }

// AppointmentsTableRow.propTypes = {
//   onEditRow: PropTypes.func,
//   onDeleteRow: PropTypes.func,
//   row: PropTypes.object
// };
