import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Theme, themes } from "../../../constants/themes";
import { wallpapers, wpprPaths } from "../../../constants/wallpapers";
import { Themes, useTheme } from "../../../contexts/ThemeContext";
import { useWallpaper } from "../../../contexts/WallpaperContext";
import { getWppIndex } from "../../../utils/utils";
import style from "./ThemeSwitcher.module.scss";
import { FileAsUrl, useFileSystem } from "@/contexts/FileSystemContext";

interface Theme2 extends Theme {
  theme: string;
}

type ThemeSwitcherProps = {
  themeSwitcherOpen: boolean;
  setThemeSwitcherOpen: Dispatch<SetStateAction<boolean>>
};

export default function ThemeSwitcher({
  themeSwitcherOpen, setThemeSwitcherOpen
}: ThemeSwitcherProps) {
  const [currentTheme, setTheme] = useTheme();
  const [wallpaperName, setWallpaperName] = useWallpaper();
  const {getFileUrl, readFilesFromDir, fs} = useFileSystem();
  const getWpprUrl = useCallback(async (theme: Themes) => {
    const wppr = localStorage.getItem(theme + "_wallpaper");
    if(!wppr){
      // If there is no wallpaper set for theme then get the first on the wallpaper folder (gotta make sure its a image file later)
      const wpprs = await readFilesFromDir(wpprPaths[theme], true) as FileAsUrl[];
      if(wpprs?.[0]){
        return wpprs[0];
      }
      // If the user didn't access the folder it means there is no files there, and it also means that that he didn't add anything different from the default so I can just return the default
      return {url: wallpapers[theme][0], name: wallpapers[theme][0].split('/').pop()}
    }
    const url = await getFileUrl(wpprPaths[theme] + '/' + wppr);    
    return {url: url, name: wppr};
  }, [getFileUrl, readFilesFromDir])
  const [themesList, setTheeList]= useState<Theme2[]>([]);

  useEffect(() => {
    const getList = async () => {
      const list: Theme2[] = []
      for await (const key of Object.keys(wallpapers)) {
        list.push({
          theme: key,
          wpp: await getWpprUrl(key as Themes) as {url: string, name: string},
          ...themes[key],
        });
      }
        setTheeList(list);
    }
    if(fs){
      getList();
    }
  }, [getWpprUrl, fs, wallpaperName])



  const handleChangeTheme = (theme: Theme2) => {      
    setWallpaperName(theme.wpp?.name as string);
    setTheme(theme.theme as Themes);
    setThemeSwitcherOpen(false)
  };

  return (
    <AnimatePresence>
      {themeSwitcherOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={style.theme_switcher}
        >
          {themesList.map((theme) => (
            <a
              onClick={() => handleChangeTheme(theme)}
              key={theme.wpp?.name}
              className={`${style.theme}  ${
                theme.theme == currentTheme && style.active
              }`}
              style={
                {
                  "--color": theme.color,
                  "--theme-name": theme.name,
                } as CSSProperties
              }
            >
              <div
                className={`backgroundImage ${style.theme_img}`}
                style={{ backgroundImage: `url("${theme.wpp?.url}"` }}
              ></div>
              <span>{theme.name}</span>
            </a>
          ))}
        </motion.div>
      )}
      /
    </AnimatePresence>
  );
}
