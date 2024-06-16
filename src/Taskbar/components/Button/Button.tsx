import { CSSProperties, ReactNode, forwardRef, useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import defaultStyles from './Button.module.scss';

type ButtonPropsType = {
    children?: ReactNode,
    styles?: CSSProperties,
    hoverStyles?: CSSProperties,
    outline?:boolean,
    handleClick?: () => void
}


const Button = forwardRef<HTMLButtonElement, ButtonPropsType>(({handleClick, styles, hoverStyles, children, outline}: ButtonPropsType, ref) => {
    const height = !handleClick ? {height: "calc(100% - 14px)"} : {height: "100%"}
    const stylesMiddle = {
        ...height,
        ...styles
    }
    const [theme] = useTheme();

    const [hovered, setHovered] = useState(false); // State to track hover status
    const handleMouseEnter = () => {
        setHovered(true);
      };
  
      const handleMouseLeave = () => {
        setHovered(false);
      };


    return (
    handleClick ? 
    <button ref={ref} style={hovered ? {...stylesMiddle, ...hoverStyles} : stylesMiddle}   onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick} className={`${defaultStyles.default_outline_button } ${outline ? defaultStyles.gradient : ''} ${defaultStyles[theme.value]}`}>
        {children}
    </button> : 
    <div style={stylesMiddle} className={`${defaultStyles.default_outline_button } ${outline ? defaultStyles.gradient : ''} ${defaultStyles[theme.value]}`}>
        {children}
    </div>
    )
});

export default Button;
