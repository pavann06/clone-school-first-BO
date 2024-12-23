import { Helmet } from 'react-helmet-async';

import FeaturesListView from 'src/sections/features/view/features-list-view';

// ----------------------------------------------------------------------

export default function FeatureListPage() {
  return (
    <>
      <Helmet>
        <title>Speciality List</title>
      </Helmet>

      <FeaturesListView />
    </>
  );
}
