// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { useFormContext } from 'react-hook-form';

// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// import request from 'src/api/request';

// export default function HospitalNewEditCity({ currentHospital }) {
//   const { setValue } = useFormContext();
//   const [selectedCity, setSelectedCity] = useState(null);

//   const { data: cityData, isLoading } = useQuery({
//     queryKey: ['cities'],
//     queryFn: () => request.get('/cities', { offset: 0, limit: 500 }),
//     staleTime: 24 * 60 * 60 * 1000,
//   });

//   useEffect(() => {
//     if (currentHospital && currentHospital.city) {
//       const initialCity = cityData?.info?.find(
//         (city) => city.city_name === currentHospital.city
//       );
//       setSelectedCity(initialCity || null);
//     }
//   }, [currentHospital, cityData?.info]);

//   useEffect(() => {
//     setValue('city', selectedCity ? selectedCity.city_name : null);
//   }, [selectedCity, setValue]);

//   return (
//     <Autocomplete
//       value={selectedCity || null}
//       options={isLoading ? [] : cityData?.info || []}
//       getOptionLabel={(option) => option.city_name || ''}
//       renderOption={(props, option) => (
//         <li {...props} key={option.id}>
//           {option.city_name}
//         </li>
//       )}
//       onChange={(event, newValue) => {
//         setSelectedCity(newValue || null);
//       }}
//       renderInput={(params) => <TextField {...params} label="City" />}
//     />
//   );
// }

// HospitalNewEditCity.propTypes = {
//   currentHospital: PropTypes.shape({
//     city: PropTypes.string,
//   }),
// };
