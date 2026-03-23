export function buildConditions(pagination, lastSorter) {
    let sort_field_id;
    let sort_order;
    if (lastSorter && lastSorter.order) {
        sort_field_id = lastSorter.field || lastSorter.columnKey;
        sort_order = lastSorter.order === 'ascend' ? 'asc' : 'desc';
    }

    const params = {
        per_page: pagination.pageSize,
        page: pagination.current,
        ...(sort_field_id ? { sort_field_id } : {}),
        ...(sort_order ? { sort_order } : {}),
    };

    return params;
}