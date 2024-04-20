import { CSSProperties, useState } from 'react';
import styles from './ButtonGroup.module.scss';

type ButtonGroupProps = {
    buttons: {
        icon?: string;
        label?: string;
        action: string 
    }[],
    stylesProp?: CSSProperties
    selectedValue: string | undefined,
    useMaskImage?: boolean,
    handleClick?: (action: string) => void
}

function ButtonGroup({buttons, stylesProp, selectedValue, useMaskImage, handleClick}: ButtonGroupProps){
    const [selected, setSelected ] = useState(selectedValue ?? "");

    const handleButtonClick = (action: string) => {
        setSelected(action);
        if(handleClick)
            handleClick(action)
    }
    return (
        <div className={styles.button_group}>
            {
            buttons.map((button) => 
            <button key={button.action}  style={stylesProp}
            className={`${selected === button.action ? styles['ghost_button_selected'] : ''} ${button?.label?.length ?? 0 > 0 ? styles['ghost_button_w_label'] : ''} ${styles.ghost_button}`}
            onClick={() => handleButtonClick(button.action) }>
                {useMaskImage ? <div className='svgMask' style={{maskImage: `url(${button.icon})`, maskSize: "100%", width: "100%", height: "100%"}}></div> : <img src={button.icon}></img>}
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

