import { wallpapers } from "./wallpapers";

export const deletableDefaultFolders = ['/home/desktop/projects_default_folder']

export const defaultFolders = [
    '/home',
    '/home/desktop',
    '/home/downloads',
    ...deletableDefaultFolders,
    '/home/music',
    '/home/videos',
    '/home/pictures',
    '/home/pictures/nord',
    '/home/pictures/lake slate',
    '/home/pictures/cozy',
    '/home/documents'
];

export const defaultFiles: {[key: string]: string[]} = {
    '/home/documents': ['https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/curriculo/Eric%20Augusto%20Front%20End%20Dev%20-%20Resume.pdf', 
        'https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/curriculo/Eric%20Augusto%20Dev%20Front%20End%20-%20Curr%C3%ADculo.pdf'],
    '/home/pictures/nord': wallpapers.dark,
    '/home/pictures/lake slate': wallpapers.light,
    '/home/pictures/cozy': wallpapers.cozy
}
