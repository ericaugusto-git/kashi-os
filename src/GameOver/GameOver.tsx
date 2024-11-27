import { usePcStatus } from '@/contexts/PcStatusContext';
import './GameOver.scss';
import { useTranslation } from 'react-i18next';



const GameOver = () => {
  const [_, setPcStatus] = usePcStatus(); 
  const { t } = useTranslation();
  const uptime = Math.floor((Date.now() - performance.timing.navigationStart) / 1000);
  const uptimeStr = `${Math.floor(uptime/3600)}h ${Math.floor((uptime%3600)/60)}m ${uptime%60}s`;
  const tryAgain = () => {
    location.reload();
  }
  return (
    <div className="game-over" onClick={e => e.stopPropagation()}>
      <div className="game-over-body">
        <h1>{t("game_over")}</h1>
        <p>{t("hope")}</p>
        <button onClick={() => tryAgain()}>{t("try_again")}</button>
      </div>
      <div className="game-over-footer">
        <p>{t("uptime_game")} {uptimeStr}</p>
      </div>
    </div>
  );
};

export default GameOver;
