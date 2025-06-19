import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { EventsEditView } from 'src/sections/events/view';

// ----------------------------------------------------------------------

export default function EventsEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Events Edit</title>
      </Helmet>

      <EventsEditView id={`${id}`} />
    </>
  );
}
