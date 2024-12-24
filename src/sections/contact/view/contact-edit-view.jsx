import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ContactNewEditForm from '../contact-new-edit-form';

// ----------------------------------------------------------------------

export default function ContactEditView({ id }) {
  const settings = useSettingsContext();

  const { data, isLoading } = useQuery({
    queryKey: ['contacts', id],
    queryFn: () => request.get('/contacts', { id }),
    staleTime: 24 * 60 * 60 * 1000,
  });
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'contact',
            href: paths.dashboard.contact.root,
          },
          { name: data?.info?.[0]?.full_name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading ? <LoadingScreen /> : <ContactNewEditForm currentContact={data?.info?.[0]} />}
    </Container>
  );
}

ContactEditView.propTypes = {
  id: PropTypes.string,
};
