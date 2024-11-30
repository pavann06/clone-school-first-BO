import TextField from '@mui/material/TextField';

import { RHFAutocomplete } from 'src/components/hook-form';

export default function ContactNewEditState() {
  const stateOptions = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman And Nicobar Islands',
    'Chandigarh',
    'Dadra And Nagar Haveli And Daman And Diu',
    'Delhi',
    'Lakshadweep',
    'Puducherry',
  ];
  return (
    <RHFAutocomplete
      name="state"
      label="State"
      options={stateOptions}
      getOptionLabel={(option) => option}
      isOptionEqualToValue={(option, value) =>value && option === value}
      renderInput={(params) => <TextField {...params} label="State" variant="outlined" />}
    />
  );
}
