import Button from "./Button/Button";
import startIcon from '../../assets/taskbar/start_icon.png'
import React, {  useContext } from 'react';
import { StartSetterContext } from "../../App";


function Start(){
    const styles = {
        width: '40px',
        minWidth: '40px',
        maxWidth: '40px'
    }
    const [startMenuOpen, setStartMenuOpen] = useContext(StartSetterContext)
    const handleClick = () => {
        setStartMenuOpen(!startMenuOpen);
    }
    return (
        <Button styles={styles} handleClick={handleClick}>
            <div style={{height: "21px", width: "21px"}}>
                <img style={{height: "100%", width: "100%"}} src={startIcon}></img>
            </div>
        </Button>
    )
}

export default Start;