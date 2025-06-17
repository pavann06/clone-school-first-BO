



// //   impotst -- with satus refersh===============




// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import {
//   TableRow,
//   TableCell,
//   MenuItem,
//   IconButton,
//   Dialog,
//   DialogContent,
//   Typography,
//   Button,
//   Box,
//   DialogTitle,
//   Select,
// } from '@mui/material';
// import request from 'src/api/request';
// import Iconify from 'src/components/iconify';
// import { useSnackbar } from 'src/components/snackbar';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// export default function GallaryTableRow({ row, onEditRow, onDeleteRow }) {
//   const {
//     id,
//     serial_no,
//     event_name,
//     event_date,
//     description,
//     number_of_pics,
//     thumbnail_images,
//   } = row;

//   const [openDialog, setOpenDialog] = useState(false);
//   const [openImageDialog, setOpenImageDialog] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);

//   const { enqueueSnackbar } = useSnackbar();

//   const handleOpenImageDialog = (img) => {
//     setSelectedImage(img);
//     setOpenImageDialog(true);
//   };

//   const handleCloseImageDialog = () => {
//     setSelectedImage(null);
//     setOpenImageDialog(false);
//   };

//   const truncatedDescription =
//     description.length > 100 ? `${description.slice(0, 100)}...` : description;

//   const popover = usePopover();




//   return (
//     <>
//       <TableRow hover>
//         <TableCell>{serial_no}</TableCell>

//         <TableCell>{event_name}</TableCell>

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
      
//         <TableCell>
//         {event_date}
//         </TableCell>

//      <TableCell>
//   <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//     {Array.isArray(thumbnail_images) &&
//       thumbnail_images.map((img, index) => (
//         <img
//           key={index}
//           src={img}
//           alt={`thumb-${index}`}
//           style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
//         />
//       ))}
//   </Box>
// </TableCell>

      

//         <TableCell>
//        {number_of_pics}
//         </TableCell>

   

//         <TableCell align="center">
//           <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         </TableCell>
//       </TableRow>

//       {/* Full Description Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <DialogContent sx={{ position: 'relative', p: 3 }}>
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
//               pointerEvents: 'none',
//               userSelect: 'none',
//             }}
//           >
//             FamiliFirst
//           </Typography>

//           <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
//             Full Description
//           </Typography>

//           <Typography variant="body1" sx={{ mb: 4 }}>
//             {description}
//           </Typography>

//           <Button
//             onClick={handleCloseDialog}
//             variant="contained"
//             sx={{ display: 'block', ml: 'auto', mr: 'auto', p: 1 }}
//           >
//             Close
//           </Button>
//         </DialogContent>
//       </Dialog>

//       {/* Image Preview Dialog */}
//       <Dialog open={openImageDialog} onClose={handleCloseImageDialog} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Image Preview
//           <IconButton
//             onClick={handleCloseImageDialog}
//             sx={{ position: 'absolute', top: 8, right: 8 }}
//           >
//             <Iconify icon="eva:close-fill" />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent sx={{ p: 3 }}>
//           {selectedImage && (
//             <Box
//               component="img"
//               src={selectedImage}
//               alt="Full preview"
//               sx={{
//                 width: '90%',
//                 maxHeight: '60vh',
//                 objectFit: 'contain',
//                 borderRadius: 2,
//               }}
//             />
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Action Popover */}
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

// GallaryTableRow.propTypes = {
//   onEditRow: PropTypes.func,
//   onDeleteRow: PropTypes.func,
//   row: PropTypes.object,

// };


import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  MenuItem,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  DialogTitle,
} from '@mui/material';
import request from 'src/api/request';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function GallaryTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    id,
    serial_no,
    event_name,
    event_date,
    description,
    number_of_pics,
    thumbnail_images,
  } = row;

  const [openDialog, setOpenDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenImageDialog = () => setOpenImageDialog(true);
  const handleCloseImageDialog = () => setOpenImageDialog(false);

  const { enqueueSnackbar } = useSnackbar();
  const popover = usePopover();

  const truncatedDescription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;

  return (
    <>
      <TableRow hover>
        <TableCell>{serial_no}</TableCell>

        <TableCell>{event_name}</TableCell>

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

        <TableCell>{event_date}</TableCell>

        {/* Thumbnails Preview */}
        <TableCell>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Array.isArray(thumbnail_images) &&
              thumbnail_images.map((img, index) => (
            <div
  key={index}
  role="button"
  tabIndex={0}
  aria-label={`Open thumbnail ${index + 1}`}
  onClick={() => handleOpenImageDialog(img)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpenImageDialog(img);
    }
  }}
  style={{
    width: 40,
    height: 40,
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 4,
    cursor: 'pointer',
    border: '1px solid #ccc',
  }}
/>

              ))}
          </Box>
        </TableCell>

        <TableCell>{number_of_pics}</TableCell>

        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Full Description Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent sx={{ position: 'relative', p: 3 }}>
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

          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Full Description
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            {description}
          </Typography>

          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{ display: 'block', ml: 'auto', mr: 'auto', p: 1 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* Image Gallery Dialog */}
      <Dialog open={openImageDialog} onClose={handleCloseImageDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Image Gallery
          <IconButton
            onClick={handleCloseImageDialog}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
              p: 2,
            }}
          >
            {Array.isArray(thumbnail_images) &&
              thumbnail_images.map((img, index) => (
                <Box
                  key={index}
                  component="img"
                  src={img}
                  alt={`full-thumb-${index}`}
                  sx={{
                    width: 200,
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 2,
                    border: '1px solid #ccc',
                  }}
                />
              ))}
          </Box>
        </DialogContent>
      </Dialog>

      {/* Action Popover */}
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

GallaryTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};
