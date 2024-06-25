import { wallpapers } from "../../../constants/wallpapers";
import style from "./ThemeSwitcher.module.scss";
import { Themes, useTheme } from "../../../contexts/ThemeContext";
import { CSSProperties, useState } from "react";
import { Theme, themes } from "../../../constants/themes";
import { AnimatePresence, motion } from "framer-motion";
import { useWallpaper } from "../../../contexts/WallpaperContext";
import { getWppIndex } from "../../../utils/utils";

interface Theme2 extends Theme {
  theme: string;
}

type ThemeSwitcherProps = {
  themeSwitcherOpen: boolean;
};

export default function ThemeSwitcher({
  themeSwitcherOpen,
}: ThemeSwitcherProps) {
  const [currentTheme, setTheme] = useTheme();
  const [_, setWallpaperIndex] = useWallpaper();
  const themesList: Theme2[] = [];
  Object.keys(wallpapers).forEach((key) => {
    const theme = JSON.parse("{}");
    if (key !== "lockscreen") {
      const wallpaperIndex =
        (localStorage.getItem(theme + "wallpaper") as unknown as number) ?? 0;
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
