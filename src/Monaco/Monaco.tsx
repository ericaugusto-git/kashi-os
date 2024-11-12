import { FileProps } from "@/constants/window";
import Editor from "@monaco-editor/react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from './Monaco.module.scss';

// Map file extensions to Monaco language IDs
const getLanguageFromPath = (filePath: string): string => {
  const extension = filePath.split('.').pop()?.toLowerCase();
  const languageMap: { [key: string]: string } = {
    // JavaScript and TypeScript
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',

    // Web
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'less': 'less',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',

    // Programming Languages
    'py': 'python',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cs': 'csharp',
    'go': 'go',
    'rs': 'rust',
    'rb': 'ruby',
    'php': 'php',
    'swift': 'swift',
    'kt': 'kotlin',
    'fs': 'fsharp',
    'clj': 'clojure',
    'coffee': 'coffeescript',
    'lua': 'lua',
    'pas': 'pascal',
    'pl': 'perl',
    'r': 'r',
    'tcl': 'tcl',
    'vb': 'vb',

    // Shell and Scripts
    'sh': 'shell',
    'bash': 'shell',
    'ps1': 'powershell',
    'bat': 'bat',
    'cmd': 'bat',

    // Database
    'sql': 'sql',
    'mysql': 'mysql',
    'pgsql': 'pgsql',
    'redis': 'redis',

    // Markup and Config
    'md': 'markdown',
    'markdown': 'markdown',
    'ini': 'ini',
    'dockerfile': 'dockerfile',
    'graphql': 'graphql',
    'hbs': 'handlebars',
    'pug': 'pug',
    'razor': 'razor',

    // Other
    'sol': 'sol',  // Solidity
    'apex': 'apex',
    'azcli': 'azcli',
    'csp': 'csp',
    'msdax': 'msdax',
    'txt': 'plaintext',
  };
  
  return languageMap[extension || ''] || 'plaintext';
};

export function Monaco({ filePath, getFileUrl, updateFile }: FileProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [lineCount, setLineCount] = useState<number>(0);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    const loadFileContent = async () => {
      if (filePath && getFileUrl) {
        try {
          const url = await getFileUrl(filePath, 'text/plain');
          const response = await fetch(url);
          const text = await response.text();
          setContent(text);
        } catch (error) {
          console.error('Error loading file:', error);
          setContent('Error loading file content');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadFileContent();
  }, [filePath, getFileUrl]);

  const handleSave = useCallback(() => {
    if (editorRef.current && updateFile) {
      const newContent = editorRef.current.getValue();
      updateFile(filePath!, newContent);
      console.log('Saved');
      setHasChanges(false);
    }
  }, [filePath, updateFile]);

  //  keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Editor
        height="calc(100% - 22px)"
        defaultLanguage={getLanguageFromPath(filePath || '')}
        defaultValue={content}
        theme="vs-dark"
        onMount={(editor) => {
          setLineCount(editor.getModel()?.getLineCount() || 0);
          editorRef.current = editor;
        }}
        onChange={() => { 
          setHasChanges(true);
        }}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          readOnly: false,
        }}
      />
      
      <div className={styles.statusBar}>
        <div>
          Lines: {lineCount}
        </div>
        <button
          onClick={handleSave}
          className={`${styles.saveButton} ${hasChanges ? styles.hasChanges : ''}`}
        >
          {hasChanges ? 'Save' : 'Saved'}
        </button>
      </div>
    </div>
  );
}