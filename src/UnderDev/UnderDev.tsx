import { useTranslation } from 'react-i18next';
import style from './UnderDev.module.scss';

export default function UnderDev() {
    const { t } = useTranslation();
    return <div style={{backgroundImage: 'url(under_dev.png)'}} className={`backgroundImage ${style.under_dev} `}>
        <span>{t('under_dev')}</span>
        <div className={style.credit}>
        Illustration by <a href="https://icons8.com/illustrations/author/JXNrmH40tJdU">Ivan Haidutski</a> from <a target='_blank' href="https://icons8.com/illustrations">Ouch!</a>
        </div>
    </div>
}