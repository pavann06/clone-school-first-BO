import { Helmet } from 'react-helmet-async';

import { McqListView } from 'src/sections/mcq/view';

// ----------------------------------------------------------------------

export default function McqListPage() {
  return (
    <>
      <Helmet>
        <title>mcq's List</title>
      </Helmet>

      <McqListView />
    </>
  );
}
