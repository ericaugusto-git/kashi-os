import Button from "./Button/Button";
import startIcon from '../../assets/taskbar/start_icon.png'
function Start(){
    const styles = {
        width: '40px',
    }
    return (
        <Button icon={startIcon} styles={styles} />
    )
}

export default Start;