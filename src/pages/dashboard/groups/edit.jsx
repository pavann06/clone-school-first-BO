import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { GroupsEditView } from 'src/sections/groups/view';

// ----------------------------------------------------------------------

export default function GroupsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Groups Edit</title>
      </Helmet>

      <GroupsEditView id={`${id}`} />
    </>
  );
}
