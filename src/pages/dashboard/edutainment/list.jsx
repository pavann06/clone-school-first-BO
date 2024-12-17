import { Helmet } from 'react-helmet-async';

import EdutainmentListView from 'src/sections/edutainment/view/edutainment-list-view';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export default function EdutainmentListPage({id}) {
  return (
    <>
      <Helmet>
        <title>Speciality List</title>
      </Helmet>

      <EdutainmentListView id={id} />

    </>
  );
}

EdutainmentListPage.propTypes = {
  id: PropTypes.string, // `id` is optional
};