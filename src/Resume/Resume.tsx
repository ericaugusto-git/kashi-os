import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Document, Page } from "react-pdf";
import styles from "./Resume.module.scss";
export default function Resume() {
  const { i18n } = useTranslation();
  const triggerSave = () => {
    const link = document.createElement('a');
    link.href = file;
    link.download = `Eric Augusto ${t('resume')}`; 
    link.target = '_blank';
    link.click();
  }
  const file =
    i18n.resolvedLanguage == "pt-BR"
      ? "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/curriculo%2FEric%20Augusto%20curr%C3%ADculo.pdf"
      : "https://pub-23b2bdccea9b4dd0aa82eeba1d9c6805.r2.dev/curriculo%2FEric%20Augusto%20resume.pdf";
  return (
    <>
      <Document className={styles.resume} file={file}>
        <Page pageNumber={1} />
      </Document>
    </>
  );
}
