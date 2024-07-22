import React, { useContext } from 'react';
import { Button, Box } from '@mui/material';
import { FormatListBulletedRounded } from '@mui/icons-material';
import { ListContext } from '../../contexts/ListContext';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface BtnListProps {
  onClick: () => void;
}

const Btn_List: React.FC<BtnListProps> = ({ onClick }) => {
  const { listItems } = useContext(ListContext);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'inline-block',
        top: { xs: '105px', sm: '70px' },
        right: { xs: '70px', sm: '130px' },
      }}
    >
      <Button
        sx={{
          position: 'absolute',
          zIndex: 10,
          borderRadius: '20px',
          cursor: 'pointer',
          backgroundColor: '#ffc147',
          width: {
            xs: 'auto',
            sm: '85px',
          },
          paddingX: { xs: '0px', sm: '0px' },
          color: 'white',
          '&:hover': {
            boxShadow: 1,
          },
          '&:active': {
            boxShadow: 'none',
          },
          boxShadow: 1,
        }}
        variant="contained"
        onClick={onClick}
        startIcon={isXs ? null : <FormatListBulletedRounded />}
      >
        List
      </Button>
      {listItems.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '-10px',
            right: {xs:'-68px',sm:'-95px'},
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '23px',
            height: '23px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#363636',
            fontSize: '13px',
            fontWeight: '500',
            zIndex: 10,
            boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          {listItems.length}
        </Box>
      )}
    </Box>
  );
};

export default Btn_List;
