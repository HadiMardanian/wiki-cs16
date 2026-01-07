import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CursorProvider } from './context/CursorProvider';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { NetcodePage } from './pages/NetcodePage';
import { MousePage } from './pages/MousePage';
import { VideoPage } from './pages/VideoPage';
import { AudioPage } from './pages/AudioPage';
import { BindsPage } from './pages/BindsPage';
import { CommandsPage } from './pages/CommandsPage';
import { ScriptsPage } from './pages/ScriptsPage';
import { ProConfigsPage } from './pages/ProConfigsPage';
import { LaunchOptionsPage } from './pages/LaunchOptionsPage';
import { TroubleshootingPage } from './pages/TroubleshootingPage';

function App() {
  return (
    <CursorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="netcode" element={<NetcodePage />} />
            <Route path="mouse" element={<MousePage />} />
            <Route path="video" element={<VideoPage />} />
            <Route path="audio" element={<AudioPage />} />
            <Route path="binds" element={<BindsPage />} />
            <Route path="commands" element={<CommandsPage />} />
            <Route path="scripts" element={<ScriptsPage />} />
            <Route path="pro-configs" element={<ProConfigsPage />} />
            <Route path="launch-options" element={<LaunchOptionsPage />} />
            <Route path="troubleshooting" element={<TroubleshootingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CursorProvider>
  );
}

export default App;
