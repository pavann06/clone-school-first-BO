import { Helmet } from 'react-helmet-async';

import { GroupsListView } from 'src/sections/groups/view';

// ----------------------------------------------------------------------

export default function GroupsListPage() {
  return (
    <>
      <Helmet>
        <title>Groups List</title>
      </Helmet>

      <GroupsListView />
    </>
  );
}
