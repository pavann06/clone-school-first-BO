// import PropTypes from 'prop-types';

// import Link from '@mui/material/Link'; // Import MUI Link component
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

// export default function EdutainmentTableRow({ row, onEditRow, onDeleteRow }) {
//   const { serial_no, language, heading, description, interaction } = row;

//   const popover = usePopover();

//   return (
//     <>
//       <TableRow hover>
//         <TableCell>{serial_no}</TableCell>

//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           {/* <Avatar
//             src={image}
//             variant="rounded"
//             sx={{ width: 84, height: 64, mr: 2 }}
//           /> */}
//         </TableCell>

//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <ListItemText
//             disableTypography
//             primary={
//               <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
//                 {language}
//               </Link>
//             }
//           />
//         </TableCell>

//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <ListItemText
//             disableTypography
//             primary={
//               <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
//                 {heading}
//               </Link>
//             }
//           />
//         </TableCell>

//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <ListItemText
//             disableTypography
//             primary={
//               <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
//                 {description}
//               </Link>
//             }
//           />
//         </TableCell>

//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <ListItemText
//             disableTypography
//             primary={
//               <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
//                 {interaction}
//               </Link>
//             }
//           />
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

// EdutainmentTableRow.propTypes = {
//   onEditRow: PropTypes.func,
//   onDeleteRow: PropTypes.func,
//   row: PropTypes.object,
// };






// import PropTypes from 'prop-types';
// import Link from '@mui/material/Link'; // Import MUI Link component
// // import Avatar from '@mui/material/Avatar';
// import MenuItem from '@mui/material/MenuItem';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import IconButton from '@mui/material/IconButton';
// import ListItemText from '@mui/material/ListItemText';

// // import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';

// // ----------------------------------------------------------------------

// export default function CalenderTableRow({ row, onEditRow, onDeleteRow }) {
//   const { id, language, heading, description, likes_count, comments_count, whatsapp_share_count, posting_date, approved_by, approved_time } = row;

//   const popover = usePopover();

//   return (
//     <>
//       <TableRow hover>
//         {/* Render ID (for debugging or other purposes) */}
//         <TableCell>{id}</TableCell>

//         {/* Placeholder for an image if required */}
//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           {/* Example: You could add an avatar or image */}
//           {/* <Avatar src={image} variant="rounded" sx={{ width: 84, height: 64, mr: 2 }} /> */}
//         </TableCell>

//         {/* Render Language */}
//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <ListItemText
//             disableTypography
//             primary={
//               <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
//                 {language}
//               </Link>
//             }
//           />
//         </TableCell>

//         {/* Render Heading */}
//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <ListItemText
//             disableTypography
//             primary={
//               <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
//                 {heading}
//               </Link>
//             }
//           />
//         </TableCell>

//         {/* Render Description */}
//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <ListItemText
//             disableTypography
//             primary={
//               <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
//                 {description}
//               </Link>
//             }
//           />
//         </TableCell>

//         {/* Render Interactions (likes, comments, shares) */}
//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <ListItemText
//             disableTypography
//             primary={
//               <>
//                 <div>Likes: {likes_count}</div>
//                 <div>Comments: {comments_count}</div>
//                 <div>WhatsApp Shares: {whatsapp_share_count}</div>
//               </>
//             }
//           />
//         </TableCell>

//         {/* Render Posting Date and Approved By */}
//         <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
//           <ListItemText
//             disableTypography
//             primary={
//               <>
//                 <div>Posted on: {posting_date}</div>
//                 <div>Approved by: {approved_by}</div>
//                 <div>Approval Time: {approved_time}</div>
//               </>
//             }
//           />
//         </TableCell>

//         {/* Actions */}
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

// CalenderTableRow.propTypes = {
//   onEditRow: PropTypes.func,
//   onDeleteRow: PropTypes.func,
//   row: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     language: PropTypes.string.isRequired,
//     heading: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     likes_count: PropTypes.number.isRequired,
//     comments_count: PropTypes.number.isRequired,
//     whatsapp_share_count: PropTypes.number.isRequired,
//     posting_date: PropTypes.string.isRequired,
//     approved_by: PropTypes.string.isRequired,
//     approved_time: PropTypes.string.isRequired,
//   }).isRequired,
// };
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell, Skeleton, IconButton, MenuItem } from '@mui/material';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useRouter } from 'src/routes/hooks';

function CalenderTableRow({ row, onEditRow, onDeleteRow, isLoading }) {
  const popover = usePopover();
  const router = useRouter();

  const handleViewRow = useCallback(
    (id) => {
      router.push(`/dashboard/calender/view/${id}`);
    },
    [router]
  );

  if (isLoading) {
    return (
      <TableRow>
        {[...Array(6)].map((_, index) => (
          <TableCell key={index} align="center">
            <Skeleton variant="text" width={80} height={30} />
          </TableCell>
        ))}
      </TableRow>
    );
  }

  // // Fallback for missing row or row.id
  // if (!row || !row.id) {
  //   return (
  //     <TableRow>
  //       <TableCell align="center" colSpan={6}>
  //         No Data Available
  //       </TableCell>
  //     </TableRow>
  //   );
  // }

  return (
    <>
      <TableRow hover>
        <TableCell align="center" onClick={() => handleViewRow(row.id)} style={{ cursor: 'pointer' }}>
          {row.prompt || 'No Prompt'}
        </TableCell>
        <TableCell align="center">{row.benefit || 'No Benefit'}</TableCell>
        <TableCell align="center">{row.description || 'No Description'}</TableCell>
        <TableCell align="center">
          {row.youtube_video_url ? (
            <Link href={row.youtube_video_url} target="_blank" rel="noopener noreferrer">
              {row.youtube_video_url}
            </Link>
          ) : (
            'No URL'
          )}
        </TableCell>
        <TableCell align="center">
          {row.date ? new Date(row.date).toLocaleDateString('en-GB') : 'N/A'}
        </TableCell>
        <TableCell align="center">
          {row.image ? (
            <img
              src={row.image}
              alt={`Thumbnail for ${row.prompt}`}
              style={{ maxWidth: 100, maxHeight: 50 }}
            />
          ) : (
            'No Image'
          )}
        </TableCell>
        <TableCell>
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleViewRow(row.id);
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

CalenderTableRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    prompt: PropTypes.string,
    benefit: PropTypes.string,
    description: PropTypes.string,
    youtube_video_url: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
  }),
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  isLoading: PropTypes.bool,
};

CalenderTableRow.defaultProps = {
  row: { id: null }, // Default row with no data
  onEditRow: () => {},
  onDeleteRow: () => {},
  isLoading: false,
};

export default CalenderTableRow;
