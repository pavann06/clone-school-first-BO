import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import request from 'src/api/request';

// import { _userAbout, _userPlans, _userPayment, _userInvoices, _userAddressBook } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AccountUser from '../account-user';
import AccountClient from '../account-client';
import AccountBranch from '../account-branch';
import AccountNotifications from '../account-notifications';
import AccountChangePassword from '../account-change-password';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'user',
    label: 'User',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'branch',
    label: 'Branch',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'client',
    label: 'Client',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  // {
  //   value: 'billing',
  //   label: 'Billing',
  //   icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  // },
  {
    value: 'notifications',
    label: 'Notifications',
    icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
  },
  // {
  //   value: 'social',
  //   label: 'Social links',
  //   icon: <Iconify icon="solar:share-bold" width={24} />,
  // },
  {
    value: 'security',
    label: 'Security',
    icon: <Iconify icon="ic:round-vpn-key" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function AccountView() {
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('user');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => request.get('/profile'),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const profile = data?.info;

  if (isError) {
    return <div>Error: {error} </div>;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Account"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: 'Account' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {currentTab === 'user' && <AccountUser profile={profile} />}

      {currentTab === 'branch' && <AccountBranch profile={profile} />}

      {currentTab === 'client' && <AccountClient profile={profile} />}

      {/* {currentTab === 'billing' && (
        <AccountBilling
          plans={_userPlans}
          cards={_userPayment}
          invoices={_userInvoices}
          addressBook={_userAddressBook}
        />
      )} */}

      {currentTab === 'notifications' && <AccountNotifications />}

      {/* {currentTab === 'social' && <AccountSocialLinks socialLinks={_userAbout.socialLinks} />} */}

      {currentTab === 'security' && <AccountChangePassword />}
    </Container>
  );
}
