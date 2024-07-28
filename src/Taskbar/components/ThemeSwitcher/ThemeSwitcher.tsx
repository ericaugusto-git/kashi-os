import { AnimatePresence, motion } from "framer-motion";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import { Theme, themes } from "../../../constants/themes";
import { wallpapers } from "../../../constants/wallpapers";
import { Themes, useTheme } from "../../../contexts/ThemeContext";
import { useWallpaper } from "../../../contexts/WallpaperContext";
import { getWppIndex } from "../../../utils/utils";
import style from "./ThemeSwitcher.module.scss";

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
  const [_, setWallpaperIndex] = useWallpaper();
  const themesList: Theme2[] = [];
  Object.keys(wallpapers).forEach((key) => {
    if (key !== "lockscreen") {
      themesList.push({
        theme: key,
        wpp: wallpapers[key as Themes][getWppIndex(key as Themes)],
        ...themes[key],
      });
    }
    
    
  });

  const handleChangeTheme = (theme: string) => {
    
    setWallpaperIndex(getWppIndex(theme as Themes));
    setTheme(theme as Themes);
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
              onClick={() => handleChangeTheme(theme.theme)}
              key={theme.wpp}
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
                style={{ backgroundImage: `url("${theme.wpp}"` }}
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
