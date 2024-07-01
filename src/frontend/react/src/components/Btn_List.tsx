import React from 'react';
import { Box } from '@mui/material';

const Btn_List = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100px',
        left: '44vw',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        boxShadow: 4, // 使用 MUI 的 boxShadow 属性
        borderRadius: '50px' // 可选，添加圆角
      }}
    >
      <img src="images/note.png" width="50px" height="50px" alt="list icon" />
    </Box>
  );
};

export default Btn_List;
