import { Helmet } from 'react-helmet-async';

import { McqCreateView } from 'src/sections/mcq/view';

// ----------------------------------------------------------------------

export default function McqCreatePage() {
  return (
    <>
      <Helmet>
        <title> New mcq </title>
      </Helmet>

      <McqCreateView />
    </>
  );
}
