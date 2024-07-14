import theme from '../utils/theme';

const Tag = ({ category }) => {


  return (
    <span  style={{
      backgroundColor: '#f3f3f3', 
      color: '#616161',
      padding: '0px 9px',
      borderRadius: '4px',
      fontSize: '12px',
      marginRight: '6px', 
      display: 'inline-block' ,
      boxSizing: 'border-box',
    }}>
      {category}
    </span>
  );
}

export default Tag;