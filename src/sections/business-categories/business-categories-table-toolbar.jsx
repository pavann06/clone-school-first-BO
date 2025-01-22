// import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

// ----------------------------------------------------------------------

export default function BusinessCategoriesTableToolbar() {
  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        p: 2.5,
        pr: { xs: 2.5, md: 1 },
      }}
    />
  );
}

BusinessCategoriesTableToolbar.propTypes = {
  // filters: PropTypes.object,
  // setFilters: PropTypes.any,
};
