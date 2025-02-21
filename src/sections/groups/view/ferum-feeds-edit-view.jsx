import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FerumFeedsNewEditForm from '../ferum-feeds-new-edit-form';

// ------------------------------------------------------------------------

export default function FerumFeedsEditView({ feedId }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['edutainment', feedId],
    queryFn: () => request.get(`backoffice/forum/feeds/${feedId}`),
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'forum Feeds',
            href: paths.dashboard.groups.root,
          },
          { name: data?.data?.heading },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <FerumFeedsNewEditForm currentFeed={data?.data}  />}
    </Container>
  );
}

FerumFeedsEditView.propTypes = {
  feedId: PropTypes.string,
  
};
