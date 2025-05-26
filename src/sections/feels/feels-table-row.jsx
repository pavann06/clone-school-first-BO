


// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import ListItemText from '@mui/material/ListItemText';
// import {
//   Box,
//   TableRow,
//   MenuItem,
//   TableCell,
//   IconButton,
//   Dialog,
//   DialogContent,
//   Typography,
//   Button,
//   DialogTitle,
//   Select,
// } from '@mui/material';
// import Iconify from 'src/components/iconify';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';
// import request from 'src/api/request';
// import { useSnackbar } from 'src/components/snackbar';

// export default function FeelsTableRow({ row, onEditRow, onDeleteRow }) {
//   const { id, serial_no, title, description, likes_count, share_count, views_count, score, video } = row;

//   const [openDialog, setOpenDialog] = useState(false);
//   const [openImageDialog, setOpenImageDialog] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);


//   const { enqueueSnackbar } = useSnackbar();
//   const popover = usePopover();



//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);

//   const handleOpenImageDialog = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setOpenImageDialog(true);
//   };

//   const handleCloseImageDialog = () => {
//     setOpenImageDialog(false);
//     setSelectedImage(null);
//   };



//   return (
//     <>
//       <TableRow hover>
//         <TableCell>{serial_no}</TableCell>
//         <TableCell>{title}</TableCell>
     
//         <TableCell>
//          {description}
//         </TableCell>

//         <TableCell>
//           {video}
//         </TableCell>


//         <TableCell>
//           {likes_count}
//         </TableCell>

//         <TableCell>
//           {share_count}
//         </TableCell>

//         <TableCell>
//           {views_count}
//         </TableCell>

//         <TableCell>
//           {score}
//         </TableCell>
      
       
//         {/* Actions */}
//         <TableCell align="center">
//           <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         </TableCell>
//       </TableRow>

    

//       {/* Dialog for read more */}
  
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

// FeelsTableRow.propTypes = {
//   onEditRow: PropTypes.func,
//   onDeleteRow: PropTypes.func,
//   row: PropTypes.object.isRequired,

// };



import { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import {
  Box,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Button,
  DialogTitle,
  Select,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useSnackbar } from 'src/components/snackbar';

export default function FeelsTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    id,
    serial_no,
    title,
    description,
    likes_count,
    share_count,
    views_count,
    score,
    video,
  } = row;

  const [openDescDialog, setOpenDescDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const popover = usePopover();

  const isLongDescription = description.length > 100;
  const truncatedDescription = isLongDescription
    ? `${description.slice(0, 100)}...`
    : description;

  return (
    <>
      <TableRow hover>
        <TableCell>{serial_no}</TableCell>
        <TableCell>{title}</TableCell>

        {/* Description Cell */}
        <TableCell>
          {truncatedDescription}
          {isLongDescription && (
            <Button size="small" onClick={() => setOpenDescDialog(true)}>
              Read more
            </Button>
          )}
        </TableCell>

        {/* Video Cell */}
        <TableCell>
          {video && (
            <Button size="small" onClick={() => setOpenVideoDialog(true)}>
              Play Video
            </Button>
          )}
        </TableCell>

        <TableCell>{likes_count}</TableCell>
        <TableCell>{share_count}</TableCell>
        <TableCell>{views_count}</TableCell>
        <TableCell>{score}</TableCell>

        {/* Actions */}
        <TableCell align="center">
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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

      {/* Description Dialog */}
      <Dialog open={openDescDialog} onClose={() => setOpenDescDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Description</DialogTitle>
        <DialogContent>
          <Typography>{description}</Typography>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={openVideoDialog} onClose={() => setOpenVideoDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Video</DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
            <video
  src={video}
  controls
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }}
>
  <track
    kind="captions"
    src="path-to-captions.vtt"
    srcLang="en"
    label="English"
    default
  />
</video>

          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

FeelsTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object.isRequired,
};
