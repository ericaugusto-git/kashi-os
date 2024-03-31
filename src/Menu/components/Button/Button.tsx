import { ReactNode } from 'react';
import defaultStyles from './Button.module.scss'
import PropTypes from 'prop-types';
type CSSProperties = {
    [key: string]: string | number;
  };

type ButtonPropsType = {
    buttonClass: string, 
    icon?: string,
    children?: ReactNode,
    styles?: CSSProperties
}


function Button({buttonClass, styles, icon, children}: ButtonPropsType){
    console.log(buttonClass);
    const buttonStyles = {
        backgroundImage: `url(${icon})`,
        ...styles
    }
    console.log(buttonStyles)
    return (
    <button style={buttonStyles} className={defaultStyles[buttonClass]}
    >
        {children}
    </button>
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