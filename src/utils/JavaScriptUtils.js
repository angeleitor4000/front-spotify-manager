export function formatDuration(duration_ms) {
    if (!duration_ms) return '';

    const totalSeconds = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
