import { Helmet } from 'react-helmet-async';

import { GroupsCreateView } from 'src/sections/groups/view';

// ----------------------------------------------------------------------

export default function FamilyServiceCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Group </title>
      </Helmet>

      <GroupsCreateView />
    </>
  );
}
