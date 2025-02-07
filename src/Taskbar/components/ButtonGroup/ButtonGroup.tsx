import { CSSProperties, useState } from 'react';
import styles from './ButtonGroup.module.scss';
import { useTheme } from '../../../contexts/ThemeContext';

type ButtonGroupProps = {
    buttons: {
        icon?: string;
        label?: string;
        action: string,
        useSvg?: boolean
    }[],
    stylesProp?: CSSProperties
    selectedValue: string | undefined,
    useMaskImage?: boolean,
    handleClick?: (action: string) => void
}

function ButtonGroup({buttons,  selectedValue, useMaskImage, handleClick}: ButtonGroupProps){
    const [selected, setSelected ] = useState(selectedValue ?? "");
    const [theme] = useTheme();

    const handleButtonClick = (action: string) => {
        setSelected(action);
        if(handleClick)
            handleClick(action)
    }
    return (
        <div className={`${styles.button_group}`}>
            {
            buttons.map((button) => 
            <button key={button.action}  
            className={`${selected === button.action && styles['ghost_button_selected']} ${button?.label?.length ?? 0 > 0 ? styles['ghost_button_w_label'] : ''} ${styles.ghost_button} ${styles[theme]} backgroundTransition`}
            onClick={() => handleButtonClick(button.action) }>
                {button.useSvg || useMaskImage ? <div className={`svgMask ${styles.svg_icon}`} style={{maskImage: `url("${button.icon}")`, maskSize: "100%", width: "100%", height: "100%"}}></div> : <img src={button.icon}></img>}
                <span>
                    {button.label}
                </span>
            </button>
            )
            }
        </div>
    )
}

export default ButtonGroup;

