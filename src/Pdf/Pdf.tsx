import { FileProps } from "@/constants/apps";
import { useEffect, useState } from "react";

export default function Pdf({filePath, getFileUrl}: FileProps){
    const [pdfUrl, setPdfUrl] = useState<string>();
    useEffect(() => {
        const getPdfUrl = async () => {
        if(filePath && getFileUrl){
            const url = await getFileUrl(filePath, 'application/pdf');
            setPdfUrl(url);
        }
    }
    getPdfUrl();
    }, [filePath, getFileUrl]);
    return <div style={{width: '100%', height: '100%'}}>
            {!pdfUrl && <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}/>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>}
           {/* {pdfUrl && <embed src={pdfUrl} type="application/pdf" width={'100%'} height={'100%'}></embed>} */}
           {pdfUrl &&   <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
      <p>Failed to load :(</p>
  </object>}
    </div>
}