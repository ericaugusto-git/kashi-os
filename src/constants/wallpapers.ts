import { Themes } from "./../contexts/ThemeContext";
export type Wallpapers = {
  [key in Themes | "lockscreen"]: string[];
};
export const wallpapers: Wallpapers = {
  light: [
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/light/AdobeStock_545024145-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/light/AdobeStock_541759833 (2)-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/light/AdobeStock_279911012-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/light/AdobeStock_339118148-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/light/AdobeStock_493158837 (1)-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/light/AdobeStock_528858417 (1)-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/light/AdobeStock_573234701 (1)-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/light/AdobeStock_600790746-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/light/AdobeStock_634613027-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/light/AdobeStock_779591224-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake%2Fruins_live.gif",
  ],
  dark: [
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/dark/AdobeStock_450759088-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/dark/AdobeStock_292455515-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/dark/AdobeStock_428644126 (1)-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/dark/AdobeStock_520846967-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/dark/AdobeStock_521086816 (2)-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/dark/AdobeStock_542787203-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/dark/AdobeStock_573233503-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/dark/AdobeStock_894555652-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord%2Fnord_car_live.gif",
  ],
  cozy: [
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_362438386-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_362438411-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_497155544-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_507119108-min.jpeg",
    // "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_518070682-min.jpeg",
    // "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_543159101-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_554198596-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_578483533-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_586881841-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_602427358-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_612900015-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_613572358-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_623907234-min.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/AdobeStock_554198596.jpeg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/aesthetic/AdobeStock_768887548-min.jpeg"
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