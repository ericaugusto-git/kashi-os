import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import brasilFlag from '../../assets/taskbar/languages_icons/brazil_flag.svg';
import globeIcon from '../../assets/taskbar/languages_icons/globe.svg';
import style from './LocalteSwitcher.module.scss';
const LocaleSwitcher = () => {
  const [isVisible, setIsVisible] = useState(true);

  const { i18n } = useTranslation();
  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    moment.locale(lang.toLocaleLowerCase());
}
  const handleToggle = () => {
        // Toggle the state to replay the animation
        setIsVisible(false);
        // Use a timeout to ensure the state change is processed
        setTimeout(() => {
          setIsVisible(true)
          handleChangeLanguage(i18n.resolvedLanguage == 'pt-BR' ? 'en' : 'pt-BR')                                

        } 
        , 310);

  };

  

  return (
    <a onClick={handleToggle}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
          style={{display: 'flex',  alignItems: 'center', gap: '4px' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <span className={style.locale}>
            {i18n.resolvedLanguage?.replace('pt-', '').toLocaleUpperCase()}
            </span>
            <img className='taskbar_icon' src={i18n.resolvedLanguage == 'pt-BR' ? brasilFlag : globeIcon}></img>
            </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
};

export default LocaleSwitcher;
