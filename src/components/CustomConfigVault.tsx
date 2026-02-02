import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Eye, EyeOff, Save } from 'lucide-react';
import { ConsoleSection } from './ConsoleSection';
import { CodeBlock } from './CodeBlock';
import { useMenuSound } from '../hooks/useMenuSound';

type SavedConfig = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
};

const STORAGE_KEY = 'cs16.customConfigs';

const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const readFromStorage = (): SavedConfig[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as SavedConfig[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item) => item && item.id && item.name && item.content);
  } catch (err) {
    console.error('Failed to read custom configs:', err);
    return [];
  }
};

const writeToStorage = (configs: SavedConfig[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
  } catch (err) {
    console.error('Failed to save custom configs:', err);
  }
};

export function CustomConfigVault() {
  const { playSelect } = useMenuSound();
  const [configs, setConfigs] = useState<SavedConfig[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setConfigs(readFromStorage());
  }, []);

  const sortedConfigs = useMemo(
    () =>
      [...configs].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [configs],
  );

  const canSave = name.trim().length > 0 && content.trim().length > 0;

  const handleSave = () => {
    const trimmedName = name.trim();
    const trimmedContent = content.trim();

    if (!trimmedName || !trimmedContent) {
      setError('Name and config body are required.');
      return;
    }

    const newConfig: SavedConfig = {
      id: generateId(),
      name: trimmedName.slice(0, 64),
      content: trimmedContent,
      createdAt: new Date().toISOString(),
    };

    const next = [newConfig, ...configs];
    setConfigs(next);
    writeToStorage(next);
    setName('');
    setContent('');
    setError(null);
    playSelect();
  };

  const handleToggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    playSelect();
  };

  const handleCopy = async (config: SavedConfig) => {
    try {
      await navigator.clipboard.writeText(config.content);
      setCopiedId(config.id);
      setTimeout(() => setCopiedId(null), 1500);
      playSelect();
    } catch (err) {
      console.error('Failed to copy config:', err);
    }
  };

  return (
    <>
      <ConsoleSection title="Custom Config Vault">
        <p className="mb-4 text-xs md:text-sm">
          Write your own config, give it a name, and store it inside the site. Saved configs are
          kept in your browser on this device.
        </p>

        <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
          <div className="bg-cs-dark border border-cs-green/30 p-4">
            <label className="block text-[10px] md:text-xs text-cs-gray mb-2">
              Config name
              <input
                className="mt-1 w-full bg-cs-black border border-cs-green/30 text-cs-green px-2 py-2 text-xs md:text-sm"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="my-awp-config"
              />
            </label>
            <label className="block text-[10px] md:text-xs text-cs-gray">
              Config content
              <textarea
                className="mt-1 w-full min-h-[160px] bg-cs-black border border-cs-green/30 text-cs-green px-2 py-2 text-xs md:text-sm font-mono"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder='bind "q" "lastinv"'
              />
            </label>
            {error && (
              <p className="mt-2 text-[10px] md:text-xs text-cs-orange">{error}</p>
            )}
            <button
              type="button"
              className="mt-3 cs-button text-[10px] md:text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSave}
              disabled={!canSave}
            >
              <Save size={12} className="inline mr-1" />
              Save Config
            </button>
          </div>

          <div className="bg-cs-dark border border-cs-green/30 p-4">
            <p className="text-[10px] md:text-xs text-cs-gray mb-3">
              Saved configs: <span className="text-cs-yellow">{sortedConfigs.length}</span>
            </p>
            {sortedConfigs.length === 0 ? (
              <p className="text-xs md:text-sm text-cs-gray">
                No custom configs yet. Save one to see it here.
              </p>
            ) : (
              <div className="space-y-3">
                {sortedConfigs.map((config) => {
                  const isExpanded = expandedIds.has(config.id);
                  const isCopied = copiedId === config.id;
                  return (
                    <div
                      key={config.id}
                      className="border border-cs-green/20 bg-cs-black/60 p-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-cs-green text-xs md:text-sm font-bold">
                            {config.name}
                          </p>
                          <p className="text-[10px] md:text-xs text-cs-gray">
                            {new Date(config.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            className="cs-button text-[10px] md:text-xs px-2 py-1"
                            onClick={() => handleToggle(config.id)}
                          >
                            {isExpanded ? (
                              <>
                                <EyeOff size={12} className="inline mr-1" />
                                Hide
                              </>
                            ) : (
                              <>
                                <Eye size={12} className="inline mr-1" />
                                View
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            className="cs-button text-[10px] md:text-xs px-2 py-1"
                            onClick={() => handleCopy(config)}
                          >
                            {isCopied ? (
                              <>
                                <Check size={12} className="inline mr-1" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy size={12} className="inline mr-1" />
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-3">
                          <CodeBlock code={config.content} title={config.name} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </ConsoleSection>
    </>
  );
}
