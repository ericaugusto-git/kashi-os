import Button from "./Button/Button";
import ButtonGroup from "./ButtonGroup/ButtonGroup";
import sunsetIcon from '../../assets/taskbar/themes_icons/sunset.png'
import moonIcon from '../../assets/taskbar/themes_icons/moon.png'
import cappuccinoIcon from '../../assets/taskbar/themes_icons/cappuccino.png'
import brasilFlag from '../../assets/taskbar/languages_icons/brazil_flag.svg'
import globeIcon from '../../assets/taskbar/languages_icons/globe.svg'

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

    const styles = {
        display: "flex",
        flex: 1,
        gap: "5px",
        justifyContent: "start",
        width: "290px",
        height: "100%"
    }

    
    return(
        <Button styles={buttonStyles}>
            <div style={styles}>
                <ButtonGroup selectedValue="light" buttons={themeButtons} stylesProp={{width: "26px"}}></ButtonGroup>
                <hr className="dashed_separator"></hr>
                <ButtonGroup selectedValue="pt" buttons={languageButtons}></ButtonGroup>
            </div>
        </Button>
    )
}

export default Actions; 