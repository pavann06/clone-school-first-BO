


// // import PropTypes from 'prop-types';
// // import React, { useState, useCallback } from 'react';
// // import {
// //   TableRow,
// //   TableCell,
// //   MenuItem,
// //   IconButton,
// //   Typography,
// //   Dialog,
// //   DialogContent,
// //   Button,
// //   Link,
// // } from '@mui/material';
// // import { useRouter } from 'src/routes/hooks';
// // import Iconify from 'src/components/iconify';
// // import CustomPopover, { usePopover } from 'src/components/custom-popover';

// // function HostTableRow({ row, onEditRow, onDeleteRow, serialNumber }) {
// //   const popover = usePopover();
// //   const router = useRouter();

// //   const [openDialog, setOpenDialog] = useState(false);

// //   const handleOpenDialog = () => setOpenDialog(true);
// //   const handleCloseDialog = () => setOpenDialog(false);

// //   const handleViewRow = useCallback(
// //     (id) => {
// //       router.push(`/dashboard/calender/view/${id}`);
// //     },
// //     [router]
// //   );

// //   // Truncate description to 100 characters or 3 lines
// //   const truncatedDescription =
// //     row.description && row.description.length > 100
// //       ? `${row.description.slice(0, 100)}...`
// //       : row.description;

// //   return (
// //     <>
// //       <TableRow hover>
// //         {/* Serial Number */}
// //         <TableCell>{serialNumber}</TableCell>

// //         {/* Prompt */}
// //         <TableCell
         
// //           onClick={() => handleViewRow(row.id)}
// //           style={{ cursor: 'pointer' }}
// //         >
// //           {row.prompt || 'No Prompt'}
// //         </TableCell>

// //         {/* Benefit */}
// //         <TableCell >{row.benefit || 'No Benefit'}</TableCell>

// //         {/* Description */}
// //         <TableCell >
// //           <Typography variant="body2">
// //             {truncatedDescription || 'No Description'}{' '}
// //             {row.description && row.description.length > 100 && (
// //               <Button size="small" onClick={handleOpenDialog}>
// //                 Read More
// //               </Button>
// //             )}
// //           </Typography>
// //         </TableCell>

// //         {/* YouTube Video URL */}
// //         <TableCell >
// //           {row.youtube_video_url ? (
// //             <Link href={row.youtube_video_url} target="_blank" rel="noopener noreferrer">
// //               {row.youtube_video_url}
// //             </Link>
// //           ) : (
// //             'No URL'
// //           )}
// //         </TableCell>

// //         {/* Date */}
// //         <TableCell>
// //           {row.date}
// //         </TableCell>
      

// //         {/* Image */}
// //         <TableCell align="center">
// //           {row.image ? (
// //             <img
// //               src={row.image}
// //               alt={`Thumbnail for ${row.prompt}`}
// //               style={{ maxWidth: 100, maxHeight: 50 }}
// //             />
// //           ) : (
// //             'No Image'
// //           )}
// //         </TableCell>

// //         {/* Actions */}
// //         <TableCell align="center">
// //           <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
// //             <Iconify icon="eva:more-vertical-fill" />
// //           </IconButton>
// //         </TableCell>
// //       </TableRow>

// //       {/* Popup for Full Description */}
// //       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
// //         <DialogContent>
// //           <Typography variant="h6" gutterBottom>
// //             Full Description
// //           </Typography>
// //           <Typography variant="body1">{row.description}</Typography>
// //           <Button onClick={handleCloseDialog} sx={{ mt: 2 }} variant="contained">
// //             Close
// //           </Button>
// //         </DialogContent>
// //       </Dialog>

// //       {/* Custom Popover */}
// //       <CustomPopover
// //         open={popover.open}
// //         onClose={popover.onClose}
// //         arrow="right-top"
// //         sx={{ width: 140 }}
// //       >
// //         <MenuItem
// //           onClick={() => {
// //             onEditRow();
// //             popover.onClose();
// //           }}
// //         >
// //           <Iconify icon="solar:pen-bold" />
// //           Edit
// //         </MenuItem>
// //         <MenuItem
// //           onClick={() => {
// //             onDeleteRow();
// //             popover.onClose();
// //           }}
// //         >
// //           <Iconify icon="material-symbols:delete" />
// //           Delete
// //         </MenuItem>
// //       </CustomPopover>
// //     </>
// //   );
// // }

// // HostTableRow.propTypes = {
// //   row: PropTypes.shape({
// //     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
// //     prompt: PropTypes.string,
// //     benefit: PropTypes.string,
// //     description: PropTypes.string,
// //     youtube_video_url: PropTypes.string,
// //     date: PropTypes.string,
// //     image: PropTypes.string,
// //   }),
// //   serialNumber: PropTypes.number, // Serial Number of the row
// //   onEditRow: PropTypes.func,
// //   onDeleteRow: PropTypes.func,
// // };

// // HostTableRow.defaultProps = {
// //   row: { id: null },
// //   serialNumber: null, // Default value for serial number
// //   onEditRow: () => {},
// //   onDeleteRow: () => {},
// // };

// // export default HostTableRow;



// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import ListItemText from '@mui/material/ListItemText';
// import { Link, TableRow, MenuItem, TableCell, IconButton, Dialog, DialogContent, Typography, Button } from '@mui/material';
// import Iconify from 'src/components/iconify';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// export default function HostTableRow({ row, onEditRow, onDeleteRow }) {
//   const {
//     serial_no,
//     language,
//     heading,
//     name,
//     about_host,
//     qualification,
//     description,
//     experience,
//     likes_count,
//     comments_count,
//     whatsapp_share_count,
//     posting_date,
//     approved_by,
//     approved_time,
//     image,
//     status,
//   } = row;

//   const [openDialog, setOpenDialog] = useState(false);

//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);



//   const popover = usePopover();

//   return (
//     <>
//       <TableRow hover>
//         {/* ID */}
//         <TableCell>{serial_no}</TableCell>

//         <TableCell>
//        {name}
//         </TableCell>

      

//         {/* Approved Info */}
//         <TableCell>
//     {about_host}
//         </TableCell>

//         {/* Image */}
//         <TableCell>
//         {qualification}
//         </TableCell>

//         {/* Interactions */}
//         <TableCell>
//         {experience}
//         </TableCell>

//         {/* Language */}
     

//         {/* Status */}
       

//         {/* Actions */}
//         <TableCell align="center">
//           <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         </TableCell>
//       </TableRow>

    
// <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//   <DialogContent sx={{ position: 'relative', p: 3 }}>
//     {/* Watermark */}
 

//     {/* Title */}


//     {/* Close Button */}
//     <Button
//       onClick={handleCloseDialog}
//       variant="contained"
//       sx={{ display: 'block', ml: 'auto', mr: 'auto', p: 1 }}
//     >
//       Close
//     </Button>
//   </DialogContent>
// </Dialog>


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

// HostTableRow.propTypes = {
//   onEditRow: PropTypes.func,
//   onDeleteRow: PropTypes.func,
//   row: PropTypes.object,
// };


import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import { Link, TableRow, MenuItem, TableCell, IconButton, Dialog, DialogContent, Typography, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function HostTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no,
    language,
    name,
    description,
    about_host,
    qualification,
    experience,
    likes_count,
    comments_count,
    whatsapp_share_count,
    posting_date,
    approved_by,
    approved_time,
    image,
    status,
  } = row;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);



  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>
       {name}
        </TableCell>

       

        {/* Approved Info */}
        <TableCell>
         {about_host}
        </TableCell>

        {/* Image */}
        <TableCell>
          {qualification}
        
        </TableCell>

        {/* Interactions */}
        <TableCell>
          {experience}
        </TableCell>

      

       

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

    
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
        pointerEvents: 'none', // Prevent interaction
        userSelect: 'none',   // Prevent selection
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


      {/* Custom Popover */}
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

HostTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};
