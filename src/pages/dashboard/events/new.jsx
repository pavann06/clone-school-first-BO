import { Helmet } from 'react-helmet-async';

import { EventsCreateView } from 'src/sections/events/view';

// ----------------------------------------------------------------------

export default function EventCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Events </title>
      </Helmet>

       <EventsCreateView />

    </>
  );
}
