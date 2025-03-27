

// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import {
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

// export default function SchoolTableRow({ row, onEditRow, onDeleteRow }) {
//   const {
//     serial_no,
//     school_name,
//     school_address,
//     profile_image,
//     email,
//     contact_number,
//     website,
//   } = row;

//   const [openDialog, setOpenDialog] = useState(false);

//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);

//   const popover = usePopover();

//   return (
//     <>
//       <TableRow hover>
//         <TableCell sx={{ width: 50 }}>{serial_no}</TableCell>
//         <TableCell sx={{ width: 200 }}>{school_name}</TableCell>
//         <TableCell align="center" sx={{ width: 120 }}>
//           {profile_image ? (
//             <img
//               src={profile_image}
//               alt={`Thumbnail for ${school_name}`}
//               style={{ maxWidth: 100, maxHeight: 50 }}
//             />
//           ) : (
//             'No Image'
//           )}
//         </TableCell>
//         <TableCell sx={{ width: 250 }}>
//           {school_address ? (
//             <>
//               <div>{school_address.mandal}</div>
//               <div>{school_address.district}</div>
//               <div>{school_address.state}</div>
//             </>
//           ) : (
//             'N/A'
//           )}
//         </TableCell>
//         <TableCell sx={{ width: 100 }}>{email}</TableCell>
//         <TableCell sx={{ width: 100 }}>{contact_number}</TableCell>
//         <TableCell sx={{ width: 100 }}>{website}</TableCell>
//         <TableCell align="center" sx={{ width: 80 }}>
//           <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         </TableCell>
//       </TableRow>

//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <DialogContent sx={{ position: 'relative', p: 3 }}>
//           <Button
//             onClick={handleCloseDialog}
//             variant="contained"
//             sx={{ display: 'block', ml: 'auto', mr: 'auto', p: 1 }}
//           >
//             Close
//           </Button>
//         </DialogContent>
//       </Dialog>

//       <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top" sx={{ width: 140 }}>
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

// SchoolTableRow.propTypes = {
//   onEditRow: PropTypes.func,
//   onDeleteRow: PropTypes.func,
//   row: PropTypes.object,
// };



import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  Button,
  Stack,
  Box,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function SchoolTableRow({ row, onEditRow, onDeleteRow }) {
  const { serial_no, school_name, school_address, profile_image, email, contact_number, website } = row;

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* Serial Number */}
        <TableCell sx={{ width: '5%', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
          {serial_no}
        </TableCell>

        {/* School Image & Name */}
        <TableCell sx={{ width: '25%', padding: 2 }}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: 2,
                overflow: 'hidden',
                background: '#f0f0f0',
              }}
            >
              {profile_image ? (
                <img
                  src={profile_image}
                  alt={`Thumbnail for ${school_name}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#666',
                  }}
                >
                  No Image
                </Box>
              )}
            </Box>
            <Typography variant="h6" fontWeight="bold" textAlign="center">
              {school_name}
            </Typography>
          </Stack>
        </TableCell>

        {/* Contact & Website */}
        <TableCell sx={{ width: '30%', padding: 2 }}>
          <Typography variant="h6" fontWeight="bold">Contact</Typography>
          <Typography variant="body1">📞 {contact_number || 'N/A'}</Typography>
          <Typography variant="body1">✉️ {email || 'N/A'}</Typography>
          <Typography variant="body1">
  🌐{' '}
  {website ? (
    <a href={website} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
      {website}
    </a>
  ) : (
    'N/A'
  )}
</Typography>
        </TableCell>

        {/* Address */}
        <TableCell sx={{ width: '30%', padding: 2 }}>
          <Typography variant="h6" fontWeight="bold">Address</Typography>
          {school_address ? (
            <Stack spacing={1}>
              <Typography variant="body1">{school_address.mandal}</Typography>
              <Typography variant="body1">{school_address.district}</Typography>
              <Typography variant="body1">{school_address.state}</Typography>
            </Stack>
          ) : (
            <Typography variant="body1">N/A</Typography>
          )}
        </TableCell>

        {/* Actions */}
        <TableCell align="center" sx={{ width: '10%', padding: 2 }}>
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogContent sx={{ position: 'relative', p: 3 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{ display: 'block', ml: 'auto', mr: 'auto', p: 1 }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top" sx={{ width: 140 }}>
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

SchoolTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.object,
};
