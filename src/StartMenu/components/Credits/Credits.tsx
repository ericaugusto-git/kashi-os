
import { t } from 'i18next';
import styles from './Credits.module.scss'


const Credits = () => {  
    const libraries = [
        { name: "react", version: "^18.2.0", url: "https://reactjs.org/" },
        { name: "react-pdf", version: "^7.7.1", url: "https://react-pdf-viewer.dev/" },
        { name: "react-painter", version: "^0.4.0", url: "https://github.com/fians/react-painter" },
        { name: "react-rnd", version: "^10.4.1", url: "https://github.com/bokuweb/react-rnd" },
        { name: "framer-motion", version: "^11.0.24", url: "https://www.framer.com/motion/" },
        { name: "EmulatorJS", version: "^11.0.24", url: "https://emulatorjs.org" },
        { name: "i18next", version: "3.0.0", url: "https://www.i18next.com/" },
        { name: "i18next-browser-languagedetector", version: "^7.2.1", url: "https://github.com/i18next/i18next-browser-languageDetector" },
        { name: "react-i18next", version: "^14.1.0", url: "https://react.i18next.com/" },
        { name: "@xterm/addon-fit", version: "^0.10.0", url: "https://github.com/xtermjs/xterm.js" },
        { name: "@xterm/xterm", version: "^5.5.0", url: "https://xtermjs.org/" },
        { name: "local-echo", version: "github:wavesoft/local-echo", url: "https://github.com/wavesoft/local-echo" },
        { name: "wttr", version: "", url: "https://github.com/chubin/wttr.in" },
        { name: "prop-types", version: "^15.8.1", url: "https://github.com/facebook/prop-types" },
        { name: "dayjs", version: "^1.11.10", url: "https://day.js.org/" },
        { name: "moment", version: "^2.30.1", url: "https://momentjs.com/" },
        { name: "react-device-detect", version: "^2.2.3", url: "https://github.com/duskload/react-device-detect" },
        { name: "react-color", version: "^2.19.3", url: "https://casesandberg.github.io/react-color/" },
        { name: "@emotion/react", version: "^11.11.4", url: "https://emotion.sh/docs/introduction" },
        { name: "@emotion/styled", version: "^11.11.5", url: "https://emotion.sh/docs/styled" },
        { name: "@mui/material", version: "^5.15.15", url: "https://mui.com/" },
        { name: "@mui/x-date-pickers", version: "^7.1.1", url: "https://mui.com/x/react-date-pickers/getting-started/" },
      ];
      const art = [ 
        {name: "Johan Mouchet's cat animation", url: "https://codepen.io/johanmouchet/pen/OXxvqM"},
        {name: "Lofi Girl Reading Book", url: "https://moewalls.com/pixel-art/lofi-girl-reading-book-while-its-raining-outside-pixel-live-wallpaper/"},
        {name: "Coding Deck Live Wallpaper", url: "https://moewalls.com/sci-fi/coding-deck-live-wallpaper/"},
        {name: "Flying Studio Ghibli GIF By Luigi Salas - GIPHY API", url: "https://giphy.com/gifs/pixel-art-arial-cardinal-bird-N5B19awm2YvwMwf8JE"},
        {name: "Cup Of Coffee Love GIF By Luigi Salas - GIPHY API", url: "https://giphy.com/gifs/art-pixel-8bit-k8kITi9SAwe9JWbUaH"},
        {name: "Studio Ghibli Pixel Art GIF - GIPHY API", url: "https://giphy.com/gifs/pixel-art-studio-ghibli-OMFfLpauGoT4c"},
        {name: "Anime room", url: "https://x.com/ArsXC"},
        // {name: "ぺい@ティア148 J-01b", url: "https://x.com/kuroneko_no_pei/status/1655339224306941955"},
        // {name: "Comet", url: "https://whvn.cc/p95y2j"},
        // {name: "Chillhop Music", url: "https://x.com/Chillhopdotcom/status/1573449135637909511"}
      ]
      const ai = [
        {name: 'sakura cityscape by freepik', url: 'https://www.freepik.com/free-ai-image/beautiful-anime-sakura-cityscape-cartoon-scene_94944970.htm#fromView=search&page=4&position=2&uuid=3113be0f-ccae-4d04-b266-25f28091581'},
        {name: 'cozy home by freepik', url: 'https://www.freepik.com/free-ai-image/anime-style-cozy-home-interior-with-furnishings_133783495.htm#fromView=search&page=1&position=9&uuid=99c72bd1-0cd1-437a-a19b-d4a24b3c56b'},
        {name: 'city landscape by freepik', url: 'https://www.freepik.com/free-ai-image/digital-art-with-city-landscape-architecture_94154622.htm#fromView=search&page=15&position=42&uuid=170e98ab-6829-44bd-bf26-381dfe22412a'},
      ]
  return (
    <div className={styles.credits}>
      <span className={styles.title}>Credits</span>
      <span className="">This website was made possible by this amazing projects</span>
      <ul className="">
        {libraries.map((lib, index) => (
          <li key={index} className="mb-2">
            <a href={lib.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              [{lib.name}] {lib.url}
            </a>
          </li>
        ))}
      </ul>
      <span>Art</span>
      <ul className="">
        {art.map((lib, index) => (
          <li key={index} className="mb-2">
            <a href={lib.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              [{lib.name}] {lib.url}
            </a>
          </li>
        ))}
      </ul>
      <span>A.I Generated thing</span>
      <ul className="">
        {ai.map((lib, index) => (
          <li key={index} className="mb-2">
            <a href={lib.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              [{lib.name}] {lib.url}
            </a>
          </li>
        ))}
      </ul>
      <span>All art remain property of their original owners. Please contact me if you want your art removed from this website <a href='mailto:eric72001@hotmail.com'>eric72001@hotmail.com</a></span>
      <span className={styles.copyright}><span>&copy;</span> 2024 Eric Augusto. {t('rights')}</span>
    </div>
  );
};

export default Credits;
