// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import ListItemText from '@mui/material/ListItemText';
// import {
//   Link,
//   TableRow,
//   MenuItem,
//   TableCell,
//   IconButton,
//   Dialog,
//   DialogContent,
//   Typography,
//   Button,
// } from '@mui/material';
// import Iconify from 'src/components/iconify';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// export default function LessonsTableRow({ row, onEditRow, onDeleteRow, onViewRow }) {
//   const {
//     serial_no,
   
//     lesson_name,
//     description,
//     lesson_type,
//     total_marks,
  
//   } = row;

//   const [openDialog, setOpenDialog] = useState(false);

//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);

//   const truncatedDescription =
//     description.length > 100 ? `${description.slice(0, 100)}...` : description;

//   const popover = usePopover();

//   return (
//     <>
//       <TableRow hover>
//         {/* ID */}
//         <TableCell>{serial_no}</TableCell>

//         <TableCell>{lesson_name}</TableCell>

//         {/* Description */}
//         <TableCell>
//           <Typography variant="body2">
//             {truncatedDescription}{' '}
//             {description.length > 100 && (
//               <Button size="small" onClick={handleOpenDialog}>
//                 Read More
//               </Button>
//             )}
//           </Typography>
//         </TableCell>

//         {/* Approved Info */}
//         <TableCell>
//           {lesson_type}
//         </TableCell>

//         {/* Image */}
//         <TableCell>
//           {total_marks}
     
//         </TableCell>

   

    

//         {/* Actions */}
//         <TableCell align="center">
//           <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         </TableCell>
//       </TableRow>

//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <DialogContent sx={{ position: 'relative', p: 3 }}>
//           {/* Watermark */}
//           <Typography
//             variant="h1"
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               color: 'rgba(0, 0, 0, 0.1)',
//               fontSize: '5rem',
//               fontWeight: 'bold',
//               pointerEvents: 'none', // Prevent interaction
//               userSelect: 'none', // Prevent selection
//             }}
//           >
//             FamiliFirst
//           </Typography>

//           {/* Title */}
//           <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
//             Full Description
//           </Typography>

//           {/* Description */}
//           <Typography variant="body1" sx={{ mb: 4 }}>
//             {description}
//           </Typography>

//           {/* Close Button */}
//           <Button
//             onClick={handleCloseDialog}
//             variant="contained"
//             sx={{ display: 'block', ml: 'auto', mr: 'auto', p: 1 }}
//           >
//             Close
//           </Button>
//         </DialogContent>
//       </Dialog>

//       {/* Custom Popover */}
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
//  <MenuItem
//           onClick={() => {
//             onViewRow();
//             popover.onClose();
//           }}
//         >
//           <Iconify icon="carbon:view" />
//           {/* <AppointmentListPage /> */}
//           Video
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

// LessonsTableRow.propTypes = {
//   onEditRow: PropTypes.func,
//   onDeleteRow: PropTypes.func,
//   onViewRow: PropTypes.func,
//   row: PropTypes.object,
// };


import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import {
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Button,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function LessonsTableRow({ row, onEditRow, onDeleteRow, onViewRow }) {
  const {
    serial_no,
    lesson_name,
    description,
    lesson_type,
    total_marks,
    id,
    course_id,
    chapter_id,
  } = row;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const truncatedDescription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* Serial Number */}
        <TableCell>{serial_no}</TableCell>

        {/* Lesson Name */}
        <TableCell>{lesson_name}</TableCell>

        {/* Truncated Description */}
        <TableCell>
          <Typography variant="body2">
            {truncatedDescription}{' '}
            {description.length > 100 && (
              <Button size="small" onClick={handleOpenDialog}>
                Read More
              </Button>
            )}
          </Typography>
        </TableCell>

        {/* Lesson Type */}
        <TableCell>{lesson_type}</TableCell>

        {/* Total Marks */}
        <TableCell>{total_marks}</TableCell>

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Full Description Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent sx={{ position: 'relative', p: 3 }}>
          {/* Watermark */}
          <Typography
            variant="h1"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'rgba(0, 0, 0, 0.1)',
              fontSize: '5rem',
              fontWeight: 'bold',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            FamiliFirst
          </Typography>

          {/* Title */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Full Description
          </Typography>

          {/* Description */}
          <Typography variant="body1" sx={{ mb: 4 }}>
            {description}
          </Typography>

          {/* Close Button */}
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{ display: 'block', ml: 'auto', mr: 'auto', p: 1 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Popover Menu */}
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        {/* <MenuItem
          onClick={() => {
            onViewRow(id, course_id, chapter_id); // ✅ Pass required data
            popover.onClose();
          }}
        >
          <Iconify icon="carbon:view" />
          Video
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            onDeleteRow();
            popover.onClose();
          }}
        >
          <Iconify icon="material-symbols:delete" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

LessonsTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
};
