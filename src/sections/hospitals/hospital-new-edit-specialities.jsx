// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useFormContext } from 'react-hook-form';

// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';

// import request from 'src/api/request';

// export default function HospitalsNewEditSpecialities({ currentHospital }) {
//   const [specialityOptions, setSpecialityOptions] = useState([]);
//   const { setValue } = useFormContext();

//   const { data: specialitydata, isLoading: loading } = useQuery({
//     queryKey: ['specialities'],
//     queryFn: () =>
//       request.get('/specialities', { offset: 0, limit: 500, speciality_for: 'HOSPITAL' }),
//     staleTime: 24 * 60 * 60 * 1000,
//   });

//   useEffect(() => {
//     if (currentHospital && currentHospital.speciality && specialitydata?.info) {
//       const initialSpecialities = specialitydata.info.filter((option) =>
//         currentHospital.speciality.includes(option.speciality_name)
//       );
//       setSpecialityOptions(initialSpecialities.map((option) => option.speciality_name));
//     }
//   }, [currentHospital, specialitydata?.info]);

//   useEffect(() => {
//     setValue('speciality', specialityOptions);
//   }, [specialityOptions, setValue]);

//   return (
//     <FormControl fullWidth>
//       <InputLabel id="speciality-label">Speciality</InputLabel>
//       <Select
//         labelId="speciality-label"
//         id="speciality"
//         name="speciality"
//         multiple
//         value={specialityOptions}
//         onChange={(event) => {
//           setSpecialityOptions(event.target.value);
//         }}
//         label="Speciality"
//         renderValue={(selected) => selected.join(', ')}
//       >
//         {loading || !specialitydata?.info ? null : specialitydata.info.map((option) => (
//           <MenuItem key={option.id} value={option.speciality_name}>
//             {option.speciality_name}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }

// HospitalsNewEditSpecialities.propTypes = {
//   currentHospital: PropTypes.shape({
//     speciality: PropTypes.arrayOf(PropTypes.string),
//   }),
// };
