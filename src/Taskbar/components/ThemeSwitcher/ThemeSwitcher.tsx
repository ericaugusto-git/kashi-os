import { wallpapers } from '../../../constants/wallpapers';
import style from './ThemeSwitcher.module.scss';

export default function ThemeSwitcher(){
    return <div className={style.theme_switcher}>
        {/* {Object.keys(wallpapers).map((key) => 

        <div key={key} className={`backgroundImage ${style.theme}`} style={{backgroundImage: `url("${wallpapers[key].imgs[0]}"`}}>
            
        </div>
        )}
        <div className={`backgroundImage ${style.theme}`} style={{backgroundImage: `url("${wallpapers.dark.imgs[0]}"`}}>
            
        </div>
        <div className={`backgroundImage ${style.theme}`} style={{backgroundImage: `url("${wallpapers.coffe.imgs[0]}"`}}>
            
        </div> */}
    </div>
}