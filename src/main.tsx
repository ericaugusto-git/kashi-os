import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Buffer as BufferModule } from 'buffer'
window.Buffer = BufferModule

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
