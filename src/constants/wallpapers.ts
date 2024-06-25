import { Themes } from "./../contexts/ThemeContext";
export type Wallpapers = {
  [key in Themes | "lockscreen"]: string[];
};
export const wallpapers: Wallpapers = {
  light: [
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flight.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake%2Fem-rofi.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake%2Fmy-neighbor-totoro-sunflowers-min.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake%2Fwallhaven-2yxp16.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake%2Fwallhaven-7pkkre-min.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake%2Fwallhaven-exqqy8.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake%2Fwallhaven-wekp5x.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake%2Fruins_live.gif",
  ],
  dark: [
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord%2Fastronaut-nord.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fdark.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord%2Fblue-black-girl.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord%2Ffractal.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord%2Fneon-shacks-nord.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord%2Fpixel-city.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord%2Ftowashi.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord%2Fnord_car_live.gif",
  ],
  cozy: [
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Fwallhaven-exqx9k-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Fwallhaven-l82kpr-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Fanime_cafe_tokyonight-min.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Flofi-cafe_gray-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Fsunset_city-min.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Fwallhaven-1pwez3-min.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Fwallhaven-l8jxe2-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Fwallhaven-l8o5jq-min.png",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Fwallhaven-p9z9qm-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Fwallhaven-zy6qro-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy%2Fdggaoc8-ad05a10a-cf70-4f17-87af-2ffeeeaf6ba7-ezgif.com-optimize-min.gif"
  ],
  // cozy: [
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-jxlkjq.jpg", 
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-2y6zl6.png",
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-456dx7.jpg",
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-ex136k.jpg",
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-m36kw1.jpg", 
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-o5jv65.jpg",
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-pkzxgp.png"
  // ],
  lockscreen: [
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flockscreen.jpg",
  ],
};
