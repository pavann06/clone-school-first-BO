import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import request from 'src/api/request';

const LessonsDropdown = forwardRef(({ value, onChange }, ref) => {
  const { enqueueSnackbar } = useSnackbar();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await request.get('backoffice/lesson'); // Change endpoint if needed
        if (response?.success && Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          enqueueSnackbar('Failed to load courses', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Error fetching courses', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
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
        {loading ? 'Loading...' : 'Select a course'}
      </MenuItem>
      {courses.map((course) => (
        <MenuItem key={course.id} value={course.id}>
          {course.lesson_name}
        </MenuItem>
      ))}
    </Select>
  );
});

LessonsDropdown.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default LessonsDropdown;
