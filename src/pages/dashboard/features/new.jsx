import { Helmet } from 'react-helmet-async';

import { FeaturesCreateView } from 'src/sections/features/view';

// ----------------------------------------------------------------------

export default function FeatureCreatePage() {
  return (
    <>
      <Helmet>
        <title> New Speciality </title>
      </Helmet>

       <FeaturesCreateView />
      
      
    </>
  );
}
