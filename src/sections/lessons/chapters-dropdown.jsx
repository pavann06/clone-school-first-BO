import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import request from 'src/api/request';

const ChapterDropdown = forwardRef(({ value, onChange }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await request.get('backoffice/chapter'); // Update endpoint if needed
        if (response?.success && Array.isArray(response.data)) {
          setChapters(response.data);
        } else {
          enqueueSnackbar('Failed to load chapters', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Error fetching chapters', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [enqueueSnackbar]);

  return (
    <Select
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      displayEmpty
    >
      <MenuItem disabled value="">
        {loading ? 'Loading...' : 'Select a chapter'}
      </MenuItem>
      {chapters.map((chapter) => (
        <MenuItem key={chapter.id} value={chapter.id}>
          {chapter.chapter_name}
        </MenuItem>
      ))}
    </Select>
  );
});

ChapterDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default ChapterDropdown;
