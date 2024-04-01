import Button from "../Button/Button";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import styles from './Actions.module.scss'

import sunsetIcon from '../../../assets/taskbar/themes_icons/sunset.png'
import moonIcon from '../../../assets/taskbar/themes_icons/moon.png'
import cappuccinoIcon from '../../../assets/taskbar/themes_icons/cappuccino.png'
import brasilFlag from '../../../assets/taskbar/languages_icons/brazil_flag.svg'
import globeIcon from '../../../assets/taskbar/languages_icons/globe.svg'

function Actions(){
    const themeButtons = [
        {icon: sunsetIcon, action: 'light'},
        {icon: moonIcon, action: 'dark'},
        {icon: cappuccinoIcon, action: 'cappuccino'}
    ];
    const languageButtons = [
        {icon: brasilFlag, action: 'pt', label: "PT-BR"},
        {icon: globeIcon, action: 'eng', label: "ENG"},
    ];
    const buttonStyles = {
        padding: "8px 10px",
    }
    
    return(
        <Button styles={buttonStyles}>
            <div className={styles.actions}>
                <ButtonGroup selectedValue="light" buttons={themeButtons} stylesProp={{width: "26px"}}></ButtonGroup>
                <hr style={{width: "25px"}} className="dashed_separator"></hr>
                <ButtonGroup selectedValue="eng" buttons={languageButtons}></ButtonGroup>
            </div>
        </Button>
    )
}

export default Actions; 