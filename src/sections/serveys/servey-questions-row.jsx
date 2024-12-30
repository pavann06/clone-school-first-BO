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

// export default function ServeyTableRow({ row, onEditRow, onDeleteRow,  }) {
//   const {
//     serial_no,
//     question,
//     options,
//     question_type,
   
//   } = row;

 




//   const popover = usePopover();

//   return (
//     <>
//       <TableRow hover>
//         {/* Serial Number */}
//         <TableCell>{serial_no}</TableCell>

//         {/* Title */}
//         <TableCell>{question}</TableCell>

//         {/* Description */}
//         <TableCell>
//           {options && typeof options === 'object' ? (
//             <ul style={{ margin: 0, paddingLeft: '1rem' }}>
//               {Object.entries(options).map(([key, value], idx) => (
//                 <li key={`option-${key}-${idx}`}>
//                   {key.toUpperCase()}: {typeof value === 'object' ? JSON.stringify(value) : value}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             'No options available'
//           )}
//         </TableCell>

//         {/* Duration */}
//         <TableCell>{question_type} mins</TableCell>

      

    

//         {/* Actions */}
//         <TableCell align="center">
//           <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         </TableCell>
//       </TableRow>

     

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
// {/* 
//         <MenuItem
//           onClick={() => {
//             onViewRow();
//             popover.onClose();
//           }}
//         >
//           <Iconify icon="carbon:view" />
//           {/* <AppointmentListPage /> */}
//           {/* View
//         </MenuItem> */} 
//       </CustomPopover>
//     </>
//   );
// }

// ServeyTableRow.propTypes = {
//   onEditRow: PropTypes.func,
//   onDeleteRow: PropTypes.func,
//   row: PropTypes.object,
// };


import PropTypes from 'prop-types';

import ListItemText from '@mui/material/ListItemText';
import { Link, TableRow, MenuItem, TableCell, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

export default function ServeyQuestionsTableRow({ row, onEditRow, onDeleteRow }) {
  const {
    serial_no,
    question,
    options,
    answer,

    description,
  } = row;

  const popover = usePopover();

  return (
    <>
      <TableRow hover>
        {/* ID */}
        <TableCell>{serial_no}</TableCell>

        <TableCell>
          <ListItemText
            disableTypography
            primary={
              <Link noWrap color="inherit" variant="subtitle2" sx={{ cursor: 'pointer' }}>
                {question}
              </Link>
            }
          />
        </TableCell>

        {/* Description */}
        <TableCell>
          {options && typeof options === 'object' ? (
            <ul style={{ margin: 0, paddingLeft: '1rem' }}>
              {Object.entries(options).map(([key, value], idx) => (
                <li key={`option-${key}-${idx}`}>
                  {key.toUpperCase()}: {typeof value === 'object' ? JSON.stringify(value) : value}
                </li>
              ))}
            </ul>
          ) : (
            'No options available'
          )}
        </TableCell>

        <TableCell>{answer}</TableCell>

        {/* Interactions */}
        <TableCell>{description}</TableCell>

        {/* Actions */}
        <TableCell align="center">
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

ServeyQuestionsTableRow.propTypes = {
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  // onViewRow: PropTypes.func,
  row: PropTypes.object,
};
