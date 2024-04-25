import Button from "../Button/Button";
import mailIcon from "../../../assets/taskbar/contact/mail.svg"
import phoneIcon from "../../../assets/taskbar/contact/phone.svg"
import likedinIcon from "../../../assets/taskbar/contact/linkedin.svg"
import githubIcon from "../../../assets/taskbar/contact/github.svg"
import styles from "./Contact.module.scss"
import { useTheme } from "../../../contexts/ThemeContext";

function Contact(){

    const openEmail = () => {
        window.open('mailto:eric72001@hotmail.com', '_blank')
    }

    const openPhone = () => {
        window.open('tel:71981886126', '_blank')
    }
    const [theme] = useTheme();
    return ( 
        <Button styles={{padding: "7px 10px"}}>
            <div className={`${styles.contact_info} ${styles[theme]}`}>
                <a className={styles.contact_item} onClick={openEmail}>
                    <div style={{ maskImage: `url(${mailIcon})` }} className={"svgMask " + styles.icon}></div>
                    <span>eric72001@hotmail.com</span>
                </a>
                <a className={styles.contact_item} onClick={openPhone}>
                    <div style={{ maskImage: `url(${phoneIcon})` }} className={"svgMask " + styles.icon}></div>
                    <span>(71) 98188-6126</span>
                </a>
                <div className={styles.socials}>
                    <a href="https://github.com/ericaugusto-git" target="_blank"  className={styles.svg_link} style={{ maskImage: `url(${githubIcon})`}}></a>
                    <a href="https://www.linkedin.com/in/eric-augusto-775245a9/" target="_blank" className={styles.svg_link} style={{ maskImage: `url(${likedinIcon})`}}></a>
                </div>
            </div>
        </Button>
    )
}

export default Contact;