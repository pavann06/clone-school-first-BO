import { useParams } from 'react-router-dom'; // To get the id from the URL
import Container from '@mui/material/Container';

import PropTypes from 'prop-types';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FerumFeedsNewEditForm from '../ferum-feeds-new-edit-form';

export default function ForumFeedsCreateView({gruopId}) {
  console.log("Received groupId in ForumFeedsCreateView:", gruopId); // Debugging
  const settings = useSettingsContext();
  const { feedId } = useParams();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={feedId ? 'Edit Feed' : 'Create Feed'}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Feeds', href: paths.dashboard.groups.root },
          { name: feedId ? 'Edit Feed' : 'New Feed' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Pass the groupId to the form */}
      <FerumFeedsNewEditForm groupId={gruopId} feedId={feedId} />

    </Container>
  );
}

ForumFeedsCreateView.propTypes = {
  // feedId: PropTypes.any, // Ensure groupId is a required string
  gruopId: PropTypes.any,
};
