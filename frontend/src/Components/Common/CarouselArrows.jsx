import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const CustomLeftArrow = ({ onClick }) => {
    const style = {
        background: 'none',
        border: 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
        left: '10px',
    };
    return (
        <button onClick={onClick} style={style}>
            <ArrowBackIosIcon fontSize="large" />
        </button>
    );
};

export const CustomRightArrow = ({ onClick }) => {
    const style = {
        background: 'none',
        border: 'none',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
        right: '0px',
    };
    return (
        <button onClick={onClick} style={style}>
            <ArrowForwardIosIcon fontSize="large" />
        </button>
    );
};