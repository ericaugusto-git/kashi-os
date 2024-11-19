import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
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
          shut: 'shutdown',
          os: 'o.s apps',
          os1: 'OS',
          timezone: 'Timezone',
          cpu_cores: 'CPU cores',
          host: 'Host',
          terminal: 'Terminal',
          resolution: 'Resolution',
          terminal_font: 'Terminal Font',
          theme: 'Theme',
          date: 'Date',
          locale: 'Locale',
          projects_default_folder: "projects",
          playlist: "playlist",
          paint : "paint",
          credits : "credits",
          eraser_width: 'Ereaser width',
          line_width: 'Line width',
          resume: "resume.pdf",
          rights: "All rights reserved",
          drag: "Click here or drag and drop a game",
          game_list: "Your game list",
          systems: "Systems available thanks to the amazing work of the EmulatorJS Devs:",
          save_notice: "well disappear including save if you clear cache",
          under_dev: "app under development",

          change_theme: "Change Theme",
          change_wpp: "Change Wallpaper",
          change_position: "Change Desktop Position",
          reset_desktop: "Reset Desktop Icons",
          fullscreen: "Fullscreen",
          exit_fullscreen: "Exit Fullscreen",
          new_file: "New file",
          new_dir: "New folder",
          desktop_off: "Hide Desktop icons",
          desktop_on: "Show Desktop icons",
          delete_everything: "Delete everything",
          open: "Open",
          delete: "Delete",
          rename: "Rename",
          in_this_folder: "In this folder",
          audio_player: "Audio player",
          file_explorer: "File explorer",
          home: "Home",
          desktop: "Desktop",
          downloads: "Downloads",
          music: "Music",
          videos: "Videos",
          pictures: "Pictures",
          documents: "Documents",
          folder_empty: "This folder is empty"
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
            weather_error: 'Nao achamos a previsao do tempo. Foi mal :(',
            command_line: 'Prompt de Comando',
            credits: 'Créditos',
            sleep: 'mimir',
            shut: 'desligar',
            os: 's.o apps',
            os1: 'SO',
            timezone: 'Fuso horário',
            cpu_cores: 'Núcleos do processador',
            host: 'Host',
            terminal: 'Terminal',
            terminal_font: 'Fonte do Terminal',
            theme: 'Tema',
            date: 'Data',
            locale: 'Local',
            resolution: 'Resolução',
            projects_default_folder: 'projetos',
            eraser_width: 'Largura da borracha',
            line_width: 'Largura da linha',
            resume: "currículo.pdf",
            rights: "Todos os direitos reservados",
            drag: "Clique aqui ou arreste e solte o jogo",
            game_list: "Seus jogos",
            systems: "Sistemas diponíveis graças aos DEVS fora da curva do EmulatorJS:",
            save_notice: "irão desaparecer incluindo save quando cache for apagado",
            under_dev: "Aplicativo em construção :)",
            change_theme: "Mudar tema",
            change_wpp: "Alterar wallpaper",
            change_position: "Alterar posição da Desktop",
            reset_desktop: "Resetar ícones da Desktop",
            fullscreen: "Tela inteira",
            exit_fullscreen: "Sair da Tela inteira",
            new_file: "Novo arquivo",
            new_dir: "Nova pasta",
            open: "Abrir",
            rename: "Renomear",
            delete: "Apagar",
            desktop_off: "Esconder ícones da Desktop",
            desktop_on: "Exibir ícones da Desktop",
            delete_everything: "Apagar tudo",
            in_this_folder: "Nesta pasta",
            audio_player: "Reprodutor de áudio",
            file_explorer: "Explorador de arquivos",
            home: "Home",
            desktop: "Área de trabalho",
            downloads: "Downloads",
            music: "Músicas",
            videos: "Videos",
            pictures: "Fotos",
            documents: "Documentos",
            folder_empty: "Esta pasta está vazia"
        }
      }
    }
  });

export default i18n;