import { useTranslation } from "react-i18next";
import { Document, Page } from "react-pdf";
import styles from "./Resume.module.scss";
import { ResumeType, resumes } from "../constants/resume";
export default function Resume() {
  const { i18n,t } = useTranslation();
  const triggerSave = () => {
    const link = document.createElement('a');
    link.href = file;
    link.download = `Eric Augusto ${t('resume')}`; 
    link.target = '_blank';
    link.click();
  }
  const file: string = resumes[i18n.resolvedLanguage as keyof ResumeType]
  return (
    <>
    {/* <embed src={file} width={'100%'} height={'100%'}></embed> */}
    <button onClick={triggerSave} className={styles.saveButton}>
    <div className={`svgMask ${styles.icon}`}   style={{maskImage: `url("file_download.svg")`}}></div>
    </button>
      <Document className={styles.resume} file={file}>
        <Page pageNumber={1} />
      </Document>
    </>
  );
}
