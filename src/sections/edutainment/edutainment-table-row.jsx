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




import PropTypes from 'prop-types';
import Link from '@mui/material/Link'; // Import MUI Link component
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function EdutainmentTableRow({ row, onEditRow, onDeleteRow }) {
  const { id, language, heading, description, likes_count, comments_count, whatsapp_share_count, posting_date, approved_by, approved_time } = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* Render ID (for debugging or other purposes) */}
        <TableCell>{id}</TableCell>

        {/* Placeholder for an image if required */}
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Example: You could add an avatar or image */}
          {/* <Avatar src={image} variant="rounded" sx={{ width: 84, height: 64, mr: 2 }} /> */}
        </TableCell>

        {/* Render Language */}
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            disableTypography
            primary={
              <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
                {language}
              </Link>
            }
          />
        </TableCell>

        {/* Render Heading */}
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            disableTypography
            primary={
              <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
                {heading}
              </Link>
            }
          />
        </TableCell>

        {/* Render Description */}
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            disableTypography
            primary={
              <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
                {description}
              </Link>
            }
          />
        </TableCell>

        {/* Render Interactions (likes, comments, shares) */}
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            disableTypography
            primary={
              <>
                <div>Likes: {likes_count}</div>
                <div>Comments: {comments_count}</div>
                <div>WhatsApp Shares: {whatsapp_share_count}</div>
              </>
            }
          />
        </TableCell>

        {/* Render Posting Date and Approved By */}
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            disableTypography
            primary={
              <>
                <div>Posted on: {posting_date}</div>
                <div>Approved by: {approved_by}</div>
                <div>Approval Time: {approved_time}</div>
              </>
            }
          />
        </TableCell>

        {/* Actions */}
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

EdutainmentTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    likes_count: PropTypes.number.isRequired,
    comments_count: PropTypes.number.isRequired,
    whatsapp_share_count: PropTypes.number.isRequired,
    posting_date: PropTypes.string.isRequired,
    approved_by: PropTypes.string.isRequired,
    approved_time: PropTypes.string.isRequired,
  }).isRequired,
};

