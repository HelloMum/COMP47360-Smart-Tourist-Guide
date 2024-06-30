import React, { useState, useRef, useEffect } from "react";
import { FilterAltTwoTone } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";

const categories = [
  { label: "Natural", value: "natural" },
  { label: "Cultural", value: "cultural" },
  { label: "Arts", value: "arts" },
  { label: "Religious", value: "religious" },
  { label: "Shopping and Dining", value: "shopping and dining" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Other", value: "other" },
];

const CustomFormControlLabel = ({ label, value, checked, onChange }) => (
  <FormControlLabel
    control={<Checkbox checked={checked} onChange={() => onChange(value)} sx={{
      '& .MuiSvgIcon-root': { fontSize: 20 },
      '& .MuiCheckbox-root': { borderRadius: 2 },
      '& .MuiCheckbox-root:hover': { borderColor: 'rgba(0, 0, 0, 0.23)' },
      '& .Mui-checked': { color: '#999' },
    }} />}
    label={label}
    sx={{ '.MuiTypography-root': { fontSize: '0.78rem' }, margin: '-3px 0', color: '#777' }}
  />
);

const FilterCheckbox = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = () => {
    setOpen(!open);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategories(prevState => {
      const newCategories = prevState.includes(value) ? prevState.filter(c => c !== value) : [...prevState, value];
      onChange(newCategories);
      return newCategories;
    });
  };

  return (
    <>
      <Stack direction="row" alignItems="center" onClick={handleChange}>
        <FilterAltTwoTone style={{ color: '#999999', borderRadius: 20 }} />
        <span style={{ marginLeft: '2px', color: '#777777' }}>category</span>
      </Stack>

      {open && (
        <Box ref={ref} sx={{ boxShadow: 1, p: 1, borderRadius: 1, backgroundColor: '#fff', top: '155px', left: '25px', position: 'absolute', zIndex: 1000 }}>
          <FormGroup
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              columnGap: 2,
              rowGap: 0,
            }}
          >
            {categories.map(category => (
              <CustomFormControlLabel
                key={category.value}
                label={category.label}
                value={category.value}
                checked={selectedCategories.includes(category.value)}
                onChange={handleCategoryChange}
              />
            ))}
          </FormGroup>
        </Box>
      )}
    </>
  );
};

export default FilterCheckbox;
