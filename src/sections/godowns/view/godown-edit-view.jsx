import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import GodownNewEditForm from '../godown-new-edit-form';

// ----------------------------------------------------------------------

export default function GodownEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['godowns', id],
    queryFn: () => request.get('/godowns', { id }),
    staleTime: 24 * 60 * 60 * 1000,
  });
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Godown',
            href: paths.dashboard.godowns.root,
          },
          { name: data?.info?.[0]?.godown_name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <GodownNewEditForm currentGodown={data?.info?.[0]} />}
    </Container>
  );
}

GodownEditView.propTypes = {
  id: PropTypes.string,
};
