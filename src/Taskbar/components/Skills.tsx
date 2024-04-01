import Button from "./Button/Button";
import angularIcon from '../../assets/taskbar/skills/angular.png'
import htmlIcon from '../../assets/taskbar/skills/html.png'
import saasIcon from '../../assets/taskbar/skills/sass.png'
import typescriptIcon from '../../assets/taskbar/skills/typescript.png'
import reactIcon from '../../assets/taskbar/skills/react.png'
import pythonIcon from '../../assets/taskbar/skills/python.png'

function Skills(){
    const styles = {
        alignItems: "start",
        justifyContent: "start",
        padding: "2px 20px 4px 10px",
        height: "calc(100% - 4px)"
    }
    const icons = [angularIcon,htmlIcon,saasIcon,typescriptIcon,reactIcon,pythonIcon];
    return (        
    <Button styles={styles}>
        <div className='skills'>
            <div className="title-container">
            <h4 className='title'>skills</h4>
            <hr></hr>
            </div>
            <div className="icons">
                {icons.map((icon, index) => (
                    <img className="icon" key={index} src={icon} alt={`Skill ${index}`} />
                ))}
            </div>
        </div>
    </Button>)
}
export default Skills;