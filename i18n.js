import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ptBR } from '@mui/x-date-pickers/locales';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          about_me: 'About me',
          jdm_store: 'JDM Store',
          discord_clone: 'Discord clone',
          recipe_book: 'Recipe book',
          finance: 'CS50 Finance',
          front: 'Front-end Developer',
          weather_permission: 'need location permission to show weather info',
          weather_error: 'Could not get weather info. Sorry :(',
          command_line: 'command line',
          sleep: "sleep",
          os: 'o.s',
          shut: 'shutdown',
          eraser_width: 'Ereaser width',
          line_width: 'Line width'
        }
    },
    ["pt-BR"]: {
        translation: {
            about_me: 'sobre mim',
            jdm_store: 'JDM store',
            discord_clone: 'clone do discord',
            recipe_book: 'livro de receitas',
            finance: 'CS50 finance',
            front: 'Desenvolvedor Front-end',
            weather_permission: 'Habilite a localizacao para mostrar o clima',
            weather_error: 'Não consegui informacoes do clima. Foi mal :(',
            command_line: 'Prompt de Comando',
            credits: 'Créditos',
            sleep: 'suspender',
            shut: 'desligar',
            os: 's.o',
            projects: 'projetos',
            eraser_width: 'Largura da borracha',
            line_width: 'Largura da linha'
        }
      }
    }
  });

export default i18n;