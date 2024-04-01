import Button from "../Button/Button";
import mailIcon from "../../../assets/taskbar/contact/mail-icon.svg"
import phoneIcon from "../../../assets/taskbar/contact/phone.svg"
import likedinIcon from "../../../assets/taskbar/contact/linkedin.svg"
import githubIcon from "../../../assets/taskbar/contact/github.svg"
import styles from "./Contact.module.scss"

function Contact(){

    const openEmail = () => {
        window.open('mailto:eric72001@hotmail.com', '_blank')
    }

    const openPhone = () => {
        window.open('tel:71981886126', '_blank')
    }

    return ( 
        <Button styles={{padding: "7px 10px"}}>
            <div className={styles.contact_info}>
                <div className={styles.contact_item} onClick={openEmail}>
                    <img src={mailIcon}></img>
                    <a>eric72001@hotmail.com</a>
                </div>
                <div className={styles.contact_item} onClick={openPhone}>
                    <img src={phoneIcon}></img>
                    <a>(71) 98188-6126</a>
                </div>
                <div className={styles.socials}>
                    <a href="https://github.com/ericaugusto-git" target="_blank"  className={styles.svg_link} style={{ maskImage: `url(${githubIcon})`}}></a>
                    <a href="https://www.linkedin.com/in/eric-augusto-775245a9/" target="_blank" className={styles.svg_link} style={{ maskImage: `url(${likedinIcon})`}}></a>
                </div>
            </div>
        </Button>
    )
}

export default Contact;