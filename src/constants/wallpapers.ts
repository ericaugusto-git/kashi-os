import { Themes } from "./../contexts/ThemeContext";
export type Wallpapers = {
  [key in Themes]: string[];
};

// export const wallpapers: Wallpapers = {
//   light: [
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fpexels-koustabh-biswas-2110517-3737179-min.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fmarek-piwnicki-Urtf4a8e_6Y-unsplash-min.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fales-krivec-okzxVsJNxXc-unsplash-min.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fluca-bravo-zAjdgNXsMeg-unsplash-min.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fpexels-dreamypixel-547125-min.jpg",
//     // "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fpexels-eberhardgross-443446-min.jpg",
//     // "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fpexels-roaming-ant-3525983-min.jpg",
//     // "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fpexels-rpnickson-2661176-min.jpg"
//   ],
//   dark: [
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord_cc0%2Fandre-benz-qi2hmCwlhcE-unsplash-min.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord_cc0%2Fandre-benz-cXU6tNxhub0-unsplash-min.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord_cc0%2Fpexels-carlos-oliva-1966452-3586966-min.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord_cc0%2Fandre-benz-Mn9Fa_wQH-M-unsplash-min.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord_cc0%2Feugene-chystiakov-fgXBH9f477A-unsplash-min.jpg",
//     // "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord_cc0%2Fjezael-melgoza-layMbSJ3YOE-unsplash-min.jpg",
//     // "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord_cc0%2Fpexels-incrediblerafa-4737484-min.jpg",
//     // "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord_cc0%2Fpexels-podnar2018-1424246-min.jpg",
//     // "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord_cc0%2Fpexels-riccardo-bertolo-2587816-4245826-min.jpg",
//     // "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fnord_cc0%2Fvidar-nordli-mathisen-niOka5V8DWY-unsplash-min.jpg"
//   ],
//   cozy: [
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy_cc0%2Felwin-de-witte-KHBVjJ8Ctws-unsplash.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy_cc0%2Fadrian-swancar-xUm0bgxMjCM-unsplash.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy_cc0%2Fihor-malytskyi-G9Hzg0IfBvg-unsplash.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy_cc0%2Floreta-pavoliene-Qw3bDTSjVZc-unsplash.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy_cc0%2Fpexels-raybilcliff-2055389.jpg",
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy_cc0%2Fzoltan-tasi-_snNw0rqRVs-unsplash.jpg"
//   ],
//   lockscreen: [
//     "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flockscreen.jpg",
//   ],
// };

export const wpprPaths = {dark: '/home/pictures/nord',
  light: '/home/pictures/lake slate',
  cozy: '/home/pictures/cozy'}

// noppers
export const wallpapers: Wallpapers = {
  light: [
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fpexels-koustabh-biswas-2110517-3737179-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fmarek-piwnicki-Urtf4a8e_6Y-unsplash-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Flake_cc0%2Fales-krivec-okzxVsJNxXc-unsplash-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/lake_cc0/pexels-eberhardgross-443446-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/lake_cc0/pexels-rpnickson-2661176-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers/lake_cc0/pexels-roaming-ant-3525983-min.jpg"
  ],
  dark: [
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/nord/wallpapers_nord_cc0_pexels-incrediblerafa-4737484-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/nord/wallpapers_nord_cc0_andre-benz-qi2hmCwlhcE-unsplash-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/nord_cc0/pexels-riccardo-bertolo-2587816-4245826-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/nord/wallpapers_nord_cc0_andre-benz-cXU6tNxhub0-unsplash-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/nord/wallpapers_nord_cc0_pexels-carlos-oliva-1966452-3586966-min.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/nord/wallpapers_nord_cc0_pexels-podnar2018-1424246-min.jpg"
  ],
  cozy: [
    "https://pub-ca3a4c62036d4f4e8c8dbeea590f7500.r2.dev/cozy/house-near-body-water.jpg",
    "https://pub-ca3a4c62036d4f4e8c8dbeea590f7500.r2.dev/cozy/beautiful-shot-wooden-cabin-near-river-black-forest-mountains-germany.jpg",
    "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fcozy_cc0%2Felwin-de-witte-KHBVjJ8Ctws-unsplash.jpg",
    "https://pub-ca3a4c62036d4f4e8c8dbeea590f7500.r2.dev/cozy/lonely-woman-standing-near-lake-with-reflection-isolated-wooden-cabin-visible.jpg",
    "https://pub-ca3a4c62036d4f4e8c8dbeea590f7500.r2.dev/cozy/magical-shot-dolomite-mountains-fanes-sennes-prags-national-park-italy-summer.jpg",
    "https://pub-ca3a4c62036d4f4e8c8dbeea590f7500.r2.dev/cozy/shot-small-wooden-house-with-dry-grass-around-it-sunset-with-mountains-backgro.jpg",
  ]
  // cozy: [
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-jxlkjq.jpg", 
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-2y6zl6.png",
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-456dx7.jpg",
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-ex136k.jpg",
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-m36kw1.jpg", 
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-o5jv65.jpg",
  //   "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/wallpapers%2Fjapan%2Fwallhaven-pkzxgp.png"
  // ],
};