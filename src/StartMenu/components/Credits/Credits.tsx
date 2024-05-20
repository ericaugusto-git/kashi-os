
import styles from './Credits.module.scss'


const Credits = () => {  
    const libraries = [
        { name: "react", version: "^18.2.0", url: "https://reactjs.org/" },
        { name: "react-pdf", version: "^7.7.1", url: "https://react-pdf-viewer.dev/" },
        { name: "react-painter", version: "^0.4.0", url: "https://github.com/fians/react-painter" },
        { name: "react-rnd", version: "^10.4.1", url: "https://github.com/bokuweb/react-rnd" },
        { name: "framer-motion", version: "^11.0.24", url: "https://www.framer.com/motion/" },
        { name: "i18next", version: "^23.11.2", url: "https://www.i18next.com/" },
        { name: "i18next-browser-languagedetector", version: "^7.2.1", url: "https://github.com/i18next/i18next-browser-languageDetector" },
        { name: "react-i18next", version: "^14.1.0", url: "https://react.i18next.com/" },
        { name: "@xterm/addon-fit", version: "^0.10.0", url: "https://github.com/xtermjs/xterm.js" },
        { name: "@xterm/xterm", version: "^5.5.0", url: "https://xtermjs.org/" },
        { name: "local-echo", version: "github:wavesoft/local-echo", url: "https://github.com/wavesoft/local-echo" },
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
        {name: "Flying Studio Ghibli GIF By Luigi Salas", url: "https://giphy.com/gifs/pixel-art-arial-cardinal-bird-N5B19awm2YvwMwf8JE"},
        {name: "Anime room", url: "https://x.com/ArsXC"},
        {name: "ぺい@ティア148 J-01b", url: "https://x.com/kuroneko_no_pei/status/1655339224306941955"},
        {name: "Comet", url: "https://whvn.cc/p95y2j"},
        {name: "Chillhop Music", url: "https://x.com/Chillhopdotcom/status/1573449135637909511"}
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
    </div>
  );
};

export default Credits;