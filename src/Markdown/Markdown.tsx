import { FileProps } from "@/constants/window";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function Markdown({ filePath, getFileUrl }: FileProps) {
    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const loadFileContent = async () => {
        if (filePath && getFileUrl) {
          try {
            const url = await getFileUrl(filePath);
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

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="custom_scrollbar" style={{ padding: '0 1rem', overflow: 'auto', height: '100%', backgroundColor: 'rgb(var(--darker-color))' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
}