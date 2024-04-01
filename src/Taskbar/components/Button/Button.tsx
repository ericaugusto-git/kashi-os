import { ReactNode } from 'react';
import defaultStyles from './Button.module.scss'
import PropTypes from 'prop-types';
type CSSProperties = {
    [key: string]: string | number;
  };

type ButtonPropsType = {
    buttonClass: string, 
    children?: ReactNode,
    styles?: CSSProperties,
    handleClick?: unknown
}


function Button({buttonClass, styles,  children, handleClick}: ButtonPropsType){
    const height = !handleClick ? {height: "calc(100% - 14px)"} : {height: "100%"}
    const stylesMiddle = {
        ...height,
        ...styles
    }
    return (
    handleClick ? 
    <button style={stylesMiddle} className={defaultStyles[buttonClass]}>
        {children}
    </button> : 
    <div style={stylesMiddle} className={defaultStyles[buttonClass]}>
        {children}
    </div>
    )
}

export default Button;

Button.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.string, // Accepts a string (file path for image or SVG)
        PropTypes.element // Accepts an SVG component
    ]),
    children: PropTypes.node
}

Button.defaultProps = {
    buttonClass: 'default-outline-button'
}
