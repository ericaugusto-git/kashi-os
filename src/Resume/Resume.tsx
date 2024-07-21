import { useTranslation } from "react-i18next";
import { Document, Page } from "react-pdf";
import styles from "./Resume.module.scss";
import { ResumeType, resumes } from "../constants/resume";
export default function Resume() {
  const { i18n } = useTranslation();
//   const triggerSave = () => {
//     const link = document.createElement('a');
//     link.href = file;
//     link.download = `Eric Augusto ${t('resume')}`; 
//     link.target = '_blank';
//     link.click();
//   }
  const file: string = resumes[i18n.resolvedLanguage as keyof ResumeType]
  return (
    <>
      <Document className={styles.resume} file={file}>
        <Page pageNumber={1} />
      </Document>
    </>
  );
}
