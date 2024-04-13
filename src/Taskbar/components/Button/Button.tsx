import { ReactNode, forwardRef } from 'react';
import defaultStyles from './Button.module.scss';
import { useTheme } from '../../../contexts/ThemeContext';
type CSSProperties = {
    [key: string]: string | number;
  };

type ButtonPropsType = {
    children?: ReactNode,
    styles?: CSSProperties,
    handleClick?: () => void
}


const Button = forwardRef<HTMLButtonElement, ButtonPropsType>(({handleClick, styles, children}: ButtonPropsType, ref) => {
    const height = !handleClick ? {height: "calc(100% - 14px)"} : {height: "100%"}
    const stylesMiddle = {
        ...height,
        ...styles
    }
    const [theme] = useTheme();
    return (
    handleClick ? 
    <button ref={ref} style={stylesMiddle} onClick={handleClick} className={defaultStyles.default_outline_button + " " + defaultStyles[theme]}>
        {children}
    </button> : 
    <div style={stylesMiddle} className={defaultStyles.default_outline_button}>
        {children}
    </div>
    )
});

export default Button;
