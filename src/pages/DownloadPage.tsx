import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Copy, Check, AlertTriangle, FileText, ExternalLink } from 'lucide-react';
import { PageTitle } from '../components/PageTitle';
import { ConsoleSection } from '../components/ConsoleSection';
import { CodeBlock } from '../components/CodeBlock';
import { decodeConfig, type EncodedConfig } from '../utils/configEncoder';
import { useMenuSound } from '../hooks/useMenuSound';

export function DownloadPage() {
  const { data } = useParams<{ data: string }>();
  const { playSelect } = useMenuSound();
  const [config, setConfig] = useState<EncodedConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!data) {
      setError('No config data provided in URL');
      return;
    }

    const decoded = decodeConfig(data);
    if (!decoded) {
      setError('Invalid or corrupted config data');
      return;
    }

    setConfig(decoded);
  }, [data]);

  const handleDownload = useCallback(() => {
    if (!config) return;

    const blob = new Blob([config.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = config.name;
    anchor.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    playSelect();
  }, [config, playSelect]);

  const handleCopyContent = useCallback(async () => {
    if (!config) return;

    try {
      await navigator.clipboard.writeText(config.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      playSelect();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [config, playSelect]);

  const handleCopyUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      playSelect();
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  }, [playSelect]);

  // Auto-download on mount if config is valid
  useEffect(() => {
    if (config && !downloaded) {
      // Small delay to let the page render first
      const timer = setTimeout(() => {
        handleDownload();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [config, downloaded, handleDownload]);

  if (error) {
    return (
      <div>
        <PageTitle
          title="Download Error"
          subtitle="Could not load the config file"
          icon={AlertTriangle}
        />
        <ConsoleSection title="Error">
          <div className="flex items-start gap-3 text-red-400">
            <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold mb-2">Failed to decode config</p>
              <p className="text-xs text-cs-gray">{error}</p>
              <Link
                to="/"
                className="cs-button text-xs mt-4 inline-block"
              >
                Go to Config Builder
              </Link>
            </div>
          </div>
        </ConsoleSection>
      </div>
    );
  }

  if (!config) {
    return (
      <div>
        <PageTitle
          title="Loading..."
          subtitle="Decoding config data"
          icon={FileText}
        />
        <ConsoleSection title="Please wait">
          <p className="text-cs-gray text-sm">Loading config...</p>
        </ConsoleSection>
      </div>
    );
  }

  const generatedDate = new Date(config.timestamp).toLocaleString();

  return (
    <div>
      <PageTitle
        title="Download Config"
        subtitle={config.name}
        icon={Download}
      />

      {/* Download Status */}
      <motion.div
        className="bg-cs-dark border border-cs-green/50 p-4 md:p-6 mb-6"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-cs-green font-bold text-lg mb-1">
              {downloaded ? '✓ Download Started!' : 'Ready to Download'}
            </h2>
            <p className="text-cs-gray text-xs">
              File: <span className="text-cs-yellow">{config.name}</span>
            </p>
            <p className="text-cs-gray text-xs">
              Generated: <span className="text-cs-yellow">{generatedDate}</span>
            </p>
            <p className="text-cs-gray text-xs">
              Modules: <span className="text-cs-yellow">{config.ids.length} selected</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="cs-button text-xs flex items-center gap-1"
              onClick={handleDownload}
            >
              <Download size={14} />
              {downloaded ? 'Download Again' : 'Download .cfg'}
            </button>
            <button
              type="button"
              className="cs-button text-xs flex items-center gap-1"
              onClick={handleCopyContent}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Content'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <ConsoleSection title="Installation Instructions">
        <div className="space-y-3 text-xs md:text-sm">
          <div className="flex items-start gap-2">
            <span className="text-cs-green font-bold">1.</span>
            <p>
              Place the downloaded <span className="text-cs-yellow">{config.name}</span> file 
              in your <span className="text-cs-yellow">cstrike</span> folder
              <br />
              <span className="text-cs-gray text-xs">
                (Usually: C:\Program Files\Steam\steamapps\common\Half-Life\cstrike\)
              </span>
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-cs-green font-bold">2.</span>
            <p>
              Open CS 1.6 and press <span className="text-cs-yellow">~</span> to open console
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-cs-green font-bold">3.</span>
            <div>
              <p className="mb-2">Type the following command:</p>
              <div className="bg-cs-black border border-cs-green/30 p-2 font-mono text-cs-green">
                exec {config.name}
              </div>
            </div>
          </div>
        </div>
      </ConsoleSection>

      {/* Share Link */}
      <ConsoleSection title="Share This Config">
        <p className="text-xs md:text-sm text-cs-gray mb-3">
          Share this permanent link with your teammates:
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            className="flex-1 bg-cs-black border border-cs-green/30 text-cs-green px-3 py-2 text-xs font-mono"
            value={window.location.href}
            readOnly
          />
          <button
            type="button"
            className="cs-button text-xs flex items-center gap-1 justify-center"
            onClick={handleCopyUrl}
          >
            <ExternalLink size={14} />
            Copy Link
          </button>
        </div>
      </ConsoleSection>

      {/* Config Preview */}
      <ConsoleSection title="Config Content Preview">
        <CodeBlock code={config.content} title={config.name} />
      </ConsoleSection>

      {/* Back Link */}
      <div className="mt-6 text-center">
        <Link to="/" className="cs-button text-xs inline-flex items-center gap-2">
          ← Create Your Own Config
        </Link>
      </div>
    </div>
  );
}
