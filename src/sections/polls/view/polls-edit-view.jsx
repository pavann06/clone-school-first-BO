import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PollsNewEditForm from '../polls-new-edit-form';

// ------------------------------------------------------------------------

export default function PollsEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['polls', id],
    queryFn: () => request.get(`backoffice/poll/${id}`),
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Polls',
            href: paths.dashboard.polls.root,
          },
          { name: data?.data?.heading },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <PollsNewEditForm currentPoll={data?.data} />}
    </Container>
  );
}

PollsEditView.propTypes = {
  id: PropTypes.string,
};
