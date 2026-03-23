export function formatDateTime(v) {
    if (!v) return '';
    const d = new Date(v);
    const dd = `${d.getDate()}`.padStart(2, '0');
    const mm = `${d.getMonth() + 1}`.padStart(2, '0');
    const yy = d.getFullYear();
    return `${yy}/${mm}/${dd}`;
}