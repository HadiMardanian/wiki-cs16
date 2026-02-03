import LZString from 'lz-string';

export interface EncodedConfig {
  name: string;
  content: string;
  ids: string[];
  timestamp: number;
}

/**
 * Encode config data to a URL-safe string
 */
export function encodeConfig(data: EncodedConfig): string {
  const json = JSON.stringify(data);
  const compressed = LZString.compressToEncodedURIComponent(json);
  return compressed;
}

/**
 * Decode config data from URL-safe string
 */
export function decodeConfig(encoded: string): EncodedConfig | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) {
      return null;
    }
    const data = JSON.parse(json) as EncodedConfig;
    // Validate structure
    if (!data.name || !data.content || !Array.isArray(data.ids)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Generate a unique config filename
 */
export function generateConfigFileName(): string {
  const uuid =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  return `cs16-${uuid}.cfg`;
}

/**
 * Sanitize user-provided filename
 */
export function sanitizeFileName(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const cleaned = trimmed
    .replace(/\.cfg$/i, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (!cleaned) {
    return null;
  }

  return `${cleaned.slice(0, 48)}.cfg`;
}

/**
 * Build the GitHub Pages download URL
 */
export function buildDownloadUrl(encoded: string, baseUrl?: string): string {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${base}/wiki-cs16/download/${encoded}`;
}

/**
 * Build raw config URL for direct download (used for exec command hint)
 */
export function buildRawConfigUrl(encoded: string, fileName: string, baseUrl?: string): string {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${base}/wiki-cs16/raw/${encoded}/${encodeURIComponent(fileName)}`;
}
