import { useEffect, useState } from "react";
import angularIcon from '../../../assets/taskbar/skills/angular.png';
import htmlIcon from '../../../assets/taskbar/skills/html.svg';
import pythonIcon from '../../../assets/taskbar/skills/python.png';
import reactIcon from '../../../assets/taskbar/skills/react.svg';
import saasIcon from '../../../assets/taskbar/skills/sass.svg';
import typescriptIcon from '../../../assets/taskbar/skills/typescript.svg';
import { useTheme } from "../../../contexts/ThemeContext";
import Button from "../Button/Button";
import styles from './Skills.module.scss';

type Skill = {
    experience: {time: string,description: string },
    expColor: string,
    icon: string;
}

function Skills(){
    const [theme] = useTheme();

    const buttonStyles = {
        alignItems: "start",
        justifyContent: "start",
        padding: "2px 20px 4px 10px",
        height: "calc(100% - 8px)",
        border: theme == 'light' ? '1px solid rgb(207 207 207)' : "1px solid #696969",
        color: theme == 'coffe' ? 'rgb(99 128 136)' : "#676767",
        // color: "#AEB2BA",
        background: theme == 'light' ?  "#f9f9f9" : theme == 'dark' ? "#121212" : 'rgb(75 65 66)'
    }
    // const icons: Skill[] = [
    //     { experience: { time: "2+", description: "years of professional experience" }, expColor: "#dd0031", icon: angularIcon }, // Angular color
    //     { experience: { time: "4+", description: "years" }, expColor: "#e34c26", icon: htmlIcon }, // HTML color
    //     { experience: { time: "2+", description: "years" }, expColor: "#c69", icon: saasIcon },    // Sass color
    //     { experience: { time: "2+ ", description: "years of professional experience" }, expColor: "#007acc", icon: typescriptIcon }, // TypeScript color
    //     { experience: { time: "5", description: "months as a hobby :)" }, expColor: "#61dafb", icon: reactIcon }, // React color
    //     { experience: { time: "3+", description: "years of experience" }, expColor: "#306998", icon: pythonIcon } // Python color
    // ];
    const icons: Skill[] = [
        { experience: { time: "2+", description: "years" }, expColor: "#FE38BA", icon: angularIcon }, // Angular color
        { experience: { time: "4+", description: "years" }, expColor: "#e34c26", icon: htmlIcon }, // HTML color
        { experience: { time: "2+", description: "years" }, expColor: "#c69", icon: saasIcon },    // Sass color
        { experience: { time: "2+ ", description: "years" }, expColor: "#007acc", icon: typescriptIcon }, // TypeScript color
        { experience: { time: "5", description: "months" }, expColor: "#61dafb", icon: reactIcon }, // React color
        { experience: { time: "3+", description: "years" }, expColor: "#306998", icon: pythonIcon } // Python color
    ];
    
    
    const [hovered, setHovered] = useState<Skill | null>(null); // State to track hover status
    const handleMouseEnter = (icon: Skill) => {
        setHovered(icon);
      };
  
      const handleMouseLeave = () => {
        setHovered(null);
      };

      useEffect(() => {
        // This function will be called every time `hovered` state changes
        const handleAnimation = () => {
          const element = document.querySelector(`.${styles['text-slide']}`) as HTMLElement;
          if (element) {
            element.classList.remove(styles['text-slide']); // Remove existing animation class
            void element.offsetWidth; // Trigger reflow to restart the animation
            element.classList.add(styles['text-slide']); // Add animation class back to trigger animation
          }
        };
    
        handleAnimation(); // Call the animation function initially to apply the animation
      }, [hovered]); // Run the effect whenever hovered state changes

    return (        
    <Button styles={buttonStyles} outline={false}>
        <div className={styles.skills + " " + styles[theme]}>
            <div className={`${styles["title-container"]} ${styles['text-slide']}`}>
            <span className={styles['title']}>{hovered ? (<><span style={{color: hovered.expColor}}>{hovered.experience.time}</span> <span style={{color: '#AEB2BA'}}>{hovered.experience.description} of exp.</span></>) : 'skills'}</span>
            {!hovered && [1,2,3,4,5,6,7,8].map((i) => (<div key={i} className={styles.dot}></div>))}
            </div>
            <div className={styles["icons"]}>
                {icons.map((icon, _) => (
                    <div onMouseEnter={() => handleMouseEnter(icon)} onMouseLeave={() => handleMouseLeave()} className={`${styles["icon"]}  ${icon.icon == hovered?.icon ? '' : styles['svgMask'] }`} key={icon.icon} style={{[icon.icon == hovered?.icon ? 'backgroundImage' : 'maskImage']: `url("${icon.icon}")`}}>
                        {/* <img className="icon" key={index} src={icon} alt={`Skill ${index}`} /> */}
                    </div>
                ))}
            </div>
        </div>
    </Button>)
}
export default Skills;