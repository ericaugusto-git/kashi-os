import { Themes } from './../contexts/ThemeContext';
export type Wallpaper =  {video: string, imgs: string[]};
export type Wallpapers = {
  [key in Themes | 'lockscreen']: Wallpaper
};
export const wallpapers: Wallpapers = {
    dark: {video: 'https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/Coding.mp4', imgs: ['https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fdark.jpg']},
    coffe: {video: 'https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/Lofi%20Girl.mp4', imgs: ['https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy.jpg']},
    light: {video: 'https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/Topography.mp4', imgs: ['https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flight.jpg']},
    lockscreen: {video: 'https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/Lockscreen.mp4', imgs: ['https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flockscreen.jpg']},

  }
  