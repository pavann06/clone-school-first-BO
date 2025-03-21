




// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { useSnackbar } from 'notistack';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import request from 'src/api/request';

// const SearchWords = ({ value, onChange }) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [words, setWords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   // Fetch words from API with correct query parameter
//   useEffect(() => {
//     if (!searchTerm) {
//       setWords([]); // Clear results if input is empty
//       return;
//     }

//     const fetchWords = async () => {
//       setLoading(true);
//       try {
//         // Ensure keyword is passed correctly in the query params
//         const response = await request.get(`backoffice/search/word?keyword=${encodeURIComponent(searchTerm)}`);
        
//         if (response?.success && Array.isArray(response.data)) {
//           setWords(response.data);
//         } else {
//           setWords([]);
//           enqueueSnackbar('No words found', { variant: 'warning' });
//         }
//       } catch (error) {
//         setWords([]);
//         enqueueSnackbar('Error fetching words', { variant: 'error' });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWords();
//   }, [searchTerm, enqueueSnackbar]); // Fetch data when searchTerm changes

//   return (
//     <Autocomplete
//       options={words}
//       getOptionLabel={(option) => option.word}
//       loading={loading}
//       value={words.find((word) => word.id === value) || null}
//       onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
//       onChange={(event, newValue) => onChange(newValue ? newValue.id : '')}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Search word"
//           variant="outlined"
//           fullWidth
//         />
//       )}
//     />
//   );
// };

// SearchWords.propTypes = {
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export default SearchWords;




import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import request from 'src/api/request';
import { Box, Typography } from '@mui/material';

const SearchWords = ({ value, onChange }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);

  // Fetch words from API with correct query parameter
  useEffect(() => {
    if (!searchTerm) {
      setWords([]);
      return;
    }

    const fetchWords = async () => {
      setLoading(true);
      try {
        const response = await request.get(`backoffice/search/word?keyword=${encodeURIComponent(searchTerm)}`);
        
        if (response?.success && Array.isArray(response.data)) {
          setWords(response.data);
        } else {
          setWords([]);
          enqueueSnackbar('No words found', { variant: 'warning' });
        }
      } catch (error) {
        setWords([]);
        enqueueSnackbar('Error fetching words', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [searchTerm,enqueueSnackbar]);

  // Handle word selection
  // const handleWordSelect = (event, newValue) => {
  //   if (newValue) {
  //     setSelectedWord({ ...newValue }); // Store full object to allow editing of other fields
  //     onChange(newValue.id);
  //   } else {
  //     setSelectedWord(null);
  //     onChange('');
  //   }
  // };
  const handleWordSelect = (event, newValue) => {
    if (newValue) {
      setSelectedWord(newValue);
      onChange({
        word: newValue.word, // Store full word details
        points: newValue.points || '',
        parts_of_speech: newValue.parts_of_speech || '',
        usage: newValue.usage || '',
        definition: newValue.definition || '',
        origin: newValue.origin || '',
      });
    } else {
      setSelectedWord(null);
      onChange(null);
    }
  };
  

  // Handle changes in other editable fields
  const handleDetailChange = (field, newValue) => {
    setSelectedWord((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  return (
    <Box>
      {/* Autocomplete Search */}
      <Autocomplete
        options={words}
        getOptionLabel={(option) => option.word}
        loading={loading}
        value={words.find((word) => word.id === value) || null}
        onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
        onChange={handleWordSelect}
        renderInput={(params) => (
          <TextField {...params} label="Search word" variant="outlined" fullWidth />
        )}
      />

      {/* Display and Edit Word Details */}
      {selectedWord && (
        <Box mt={2}>
          <Typography variant="h6">Word Details</Typography>

          <TextField
            label="Word"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedWord.word}
            disabled // Prevent editing of the word itself
          />

          <TextField
            label="Points"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedWord.points || ''}
            onChange={(e) => handleDetailChange('points', e.target.value)}
          />

          <TextField
            label="Part of Speech"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedWord.parts_of_speech || ''}
            onChange={(e) => handleDetailChange('parts_of_speech', e.target.value)}
          />

          <TextField
            label="Usage"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedWord.usage || ''}
            onChange={(e) => handleDetailChange('usage', e.target.value)}
          />

          <TextField
            label="Definition"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedWord.definition || ''}
            onChange={(e) => handleDetailChange('definition', e.target.value)}
          />

          <TextField
            label="Origin"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedWord.origin || ''}
            onChange={(e) => handleDetailChange('origin', e.target.value)}
          />
        </Box>
      )}
    </Box>
  );
};

SearchWords.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchWords;
