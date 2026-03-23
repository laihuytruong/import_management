export function getLabelStatus(status) {
    if (status === '保留') return '#F0AD4E';
    if (status === '進行中') return '#5BC0DE';
    if (status === '完了') return '#5CB85C';
    if (status === '失敗') return '#D9534F';
    if (status === 'キャンセル') return '#777777';
    return '#F0AD4E';
}