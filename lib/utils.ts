export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\s?#]+)/
  );
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function isYouTubeUrl(url: string): boolean {
  return getYouTubeId(url) !== null;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function grenadeTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    smoke: 'Smoke',
    flash: 'Flash',
    molotov: 'Molotov',
    he: 'HE Grenade',
  };
  return labels[type] || type;
}

export function grenadeTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    smoke: '💨',
    flash: '⚡',
    molotov: '🔥',
    he: '💣',
  };
  return emojis[type] || '💣';
}

export function sideLabel(side: string): string {
  return side === 't' ? 'T-Side' : 'CT-Side';
}
