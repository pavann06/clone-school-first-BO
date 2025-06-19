import { Helmet } from 'react-helmet-async';

import { EventsListView } from 'src/sections/events/view';

// ----------------------------------------------------------------------

export default function EventsListPage() {
  return (
    <>
      <Helmet>
        <title>Events List</title>
      </Helmet>

      <EventsListView />
    </>
  );
}
