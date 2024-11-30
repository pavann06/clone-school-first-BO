import PropTypes from 'prop-types';
import {useQuery} from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BranchNewEditForm from '../branch-new-edit-form';

// ----------------------------------------------------------------------

export default function BranchEditView({id}) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['branch', id],
    queryFn: () => request.get('/clients/branch', { id }),
    staleTime: 24 * 60 * 60 * 1000,
  });
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'branch',
            href: paths.dashboard.branches.root,
          },
          { name: data?.info?.[0]?.branch_name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen/> : <BranchNewEditForm currentBranch={ data?.info?.[0]} />}
    </Container>
  );
}

BranchEditView.propTypes = {
  id: PropTypes.string,
};
