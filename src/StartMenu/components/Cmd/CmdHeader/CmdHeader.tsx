import style from "./CmdHeader.module.scss";
import clockIcon from "../../../../assets/taskbar/clock.svg";
import screenIcon from "../../../../assets/cmd/screen_icon.svg";
import xtermjsIcon from "../../../../assets/cmd/xterm.svg";
import reactIcon from '../../../../assets/taskbar/skills/react.svg'
import { asciiArt } from "../../../../constants/asciiArt";
import * as rdd from "react-device-detect";

function CmdHeader() {
    const today = new Date();
    const [day, month, year] = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
    const device = `${rdd.osName} ${rdd.osVersion} • ${rdd.browserName}`;
    const deviceInfo = [
    {icon: clockIcon, conteudo: <span>{`${year}年${month}月${day}日`}</span>}, 
    {icon: screenIcon, conteudo:<span>{device}</span>},
    {icon: reactIcon, conteudo:<span>react</span>},
    {icon: xtermjsIcon, conteudo:<span>xtermjs terminal</span>},
]
  return (
    <div className={style.ascii}>
      {/* ASCII art content */}
      {asciiArt}
      <div className={style.device_info}>
        <div className={style.host}>
          <span className={style.host_label}>eric</span><span >@</span><span className={style.host_label}>augusto.dev</span>
        </div>
        {deviceInfo.map((info, i) => (
        <div key={i} className={style.info}>
          <div
            className={"svgMask " + style.info_icon}
            style={{ maskImage: `url(${info.icon})` }}
          ></div>
          {info.conteudo}
        </div>
        ))}
      </div>
    </div>
  );
}

export default CmdHeader;
