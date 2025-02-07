
import styles from './Credits.module.scss';


const Credits = () => {  
    const libraries = [
        { name: "react", version: "^18.2.0", url: "https://reactjs.org/" },
        { name: "react-pdf", version: "^7.7.1", url: "https://react-pdf-viewer.dev/" },
        { name: "react-painter", version: "^0.4.0", url: "https://github.com/aml2610/react-painter" },
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
        { name: "moment", version: "^2.30.1", url: "https://momentjs.com/" },
        { name: "react-device-detect", version: "^2.2.3", url: "https://github.com/duskload/react-device-detect" },
        { name: "react-color", version: "^2.19.3", url: "https://casesandberg.github.io/react-color/" },
      ];
      const art = [ 
        {name: "Flying Studio Ghibli GIF By Luigi Salas - GIPHY API", url: "https://giphy.com/gifs/pixel-art-arial-cardinal-bird-N5B19awm2YvwMwf8JE"},
        {name: "Cup Of Coffee Love GIF By Luigi Salas - GIPHY API", url: "https://giphy.com/gifs/art-pixel-8bit-k8kITi9SAwe9JWbUaH"},
        {name: "Studio Ghibli Pixel Art GIF - GIPHY API", url: "https://giphy.com/gifs/pixel-art-studio-ghibli-OMFfLpauGoT4c"},
        {name: "Eugene Chystiakov", url: "https://unsplash.com/photos/a-night-view-of-a-city-and-a-bridge-fgXBH9f477A"},
        {name: "Marek Piwnicki", url: "https://unsplash.com/photos/the-night-sky-over-a-snowy-mountain-range-Urtf4a8e_6Y"},
        {name: 'cursor.in', url: "https://cursor.in/"},
        {name: "Photo by Carlos Oliva", url: "https://www.pexels.com/photo/city-skyline-across-body-of-water-during-night-time-3586966/"},
        {name: "Photo by Cátia Matos", url: "https://www.pexels.com/photo/green-leaves-1072179/"},
        {name: "Photo by Rafael Cerqueira", url: "https://www.pexels.com/photo/blue-and-white-sky-with-stars-4737484/"},
        {name: "Photo by Riccardo Bertolo", url: "https://www.pexels.com/photo/blue-sea-under-blue-sky-4245826/"},
        {name: "Photo by Janez Podnar", url: "https://www.pexels.com/photo/photo-of-brown-house-near-mountain-1424246/"},
        {name: "Photo by Satoshi Hirayama", url: "https://www.pexels.com/photo/white-and-green-osaka-castle-4058530/"},
        {name: "Photo by Roberto Nickson", url: "https://www.pexels.com/photo/lake-atitlan-2661176/"},
        {name: "Photo by SpaceX", url: "https://www.pexels.com/photo/cloud-of-smoke-after-rocket-launch-in-spaceport-586117/"},
        {name: "Photo by eberhard grossgasteiger", url: "https://www.pexels.com/photo/lake-and-mountain-under-white-sky-443446/"},
        {name: "Photo by Ray Bilcliff", url: "https://www.pexels.com/photo/landscape-photo-of-forest-2055389/"},
        {name: "Photo by Krivec Ales", url: "https://www.pexels.com/photo/red-and-brown-house-and-body-of-water-547125/"},
        {name: "Photo by Krisztian Kormos", url: "https://www.pexels.com/photo/lake-bled-in-slovenia-3525983/"},
        {name: "Photo by Andreas Schnabl", url: "https://www.pexels.com/photo/lake-bled-and-mountains-in-slovenia-19541951/"},
        {name: "Photo by KOUSTABH BISWAS", url: "https://www.pexels.com/photo/photo-of-snow-capped-mountain-3737179/"},
        {name: "Photo by Andre Benz on Unsplash", url: "https://unsplash.com/photos/empty-road-qi2hmCwlhcE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Andre Benz on Unsplash", url: "https://unsplash.com/photos/aerial-photography-of-city-skyline-during-night-time-cXU6tNxhub0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Ihor Malytskyi on Unsplash", url: "https://unsplash.com/photos/white-ceramic-cup-on-saucer-with-spoon-G9Hzg0IfBvg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Loreta Pavoliene on Unsplash", url: "https://unsplash.com/photos/glass-panel-with-frame-inside-restaurant-Qw3bDTSjVZc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Sebastian Schuppik on Unsplash", url: "https://unsplash.com/photos/tables-and-chairs-inside-building-H7xTpvBjJS4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Vidar Nordli-Mathisen on Unsplash", url: "https://unsplash.com/photos/white-concrete-house-beside-shore-niOka5V8DWY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Elwin de Witte on Unsplash", url: "https://unsplash.com/photos/a-snowy-road-with-a-house-and-a-car-in-the-background-KHBVjJ8Ctws?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Ales Krivec on Unsplash", url: "https://unsplash.com/photos/brown-hut-surrounded-by-flowers-okzxVsJNxXc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Luca Bravo on Unsplash", url: "https://unsplash.com/photos/brown-house-near-body-of-water-zAjdgNXsMeg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Joel & Jasmin Førestbird on Unsplash", url: "https://unsplash.com/photos/landscape-photography-of-snowy-mountain-and-body-of-water-efuwb5eBDrI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Marek Piwnicki on Unsplash", url: "https://unsplash.com/photos/snow-covered-mountain-under-blue-sky-k7cjQNzjkNg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Zoltan Tasi on Unsplash", url: "https://unsplash.com/photos/brown-and-white-concrete-houses-during-daytime-_snNw0rqRVs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Ling Tang on Unsplash", url: "https://unsplash.com/photos/cars-on-road-at-night-time--rffNTF8CYA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"},
        {name: "Photo by Jezael Melgoza on Unsplash", url: "https://unsplash.com/photos/people-walking-on-road-near-well-lit-buildings-layMbSJ3YOE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"}
    ];

    
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
      <span>All art remain property of their original owners. Please contact me if you want your art removed from this website <a href='mailto:eric72001@hotmail.com'>eric72001@hotmail.com</a></span>
      {/* <span className={styles.copyright}><span>&copy;</span> 2024 Eric Augusto. {t('rights')}</span> */}
    </div>
  );
};

export default Credits;
