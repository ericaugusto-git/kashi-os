import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import brasilFlag from '../../assets/taskbar/languages_icons/brazil_flag.svg';
import globeIcon from '../../assets/taskbar/languages_icons/globe.svg';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
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
    <div onClick={handleToggle} style={{ cursor: 'pointer' }}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <img className='taskbar_icon' src={i18n.resolvedLanguage == 'pt-BR' ? brasilFlag : globeIcon}></img>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocaleSwitcher;
