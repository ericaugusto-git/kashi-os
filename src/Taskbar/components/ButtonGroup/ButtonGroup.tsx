import { CSSProperties, useState } from 'react';
import styles from './ButtonGroup.module.scss';

type ButtonGroupProps = {
    buttons: {
        icon?: string;
        label?: string;
        action: string 
    }[],
    stylesProp?: CSSProperties
    selectedValue: string
}

function ButtonGroup({buttons, stylesProp, selectedValue}: ButtonGroupProps){
    const [selected, setSelected ] = useState(selectedValue ?? "");

    const handleButtonClick = (action: string) => {
        setSelected(action)
    }
    return (
        <div className={styles.button_group}>
            {
            buttons.map((button) => 
            <button key={button.action}  style={stylesProp}
            className={`${selected === button.action ? styles['ghost_button_selected'] : ''} ${button?.label?.length ?? 0 > 0 ? styles['ghost_button_w_label'] : ''} ${styles.ghost_button}`}
            onClick={() => handleButtonClick(button.action) }>
                <img src={button.icon}></img>
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

