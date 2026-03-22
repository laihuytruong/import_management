export const IMPORT_STATUS = {
    REGISTERED: 'registered',
    UPLOADED: 'uploaded',
    FAILED: 'failed',
}

export const IMPORT_STATUS_META = {
    [IMPORT_STATUS.REGISTERED]: {
        label: 'Registered',
        color: '#1f8a3d',
    },
    [IMPORT_STATUS.UPLOADED]: {
        label: 'Uploaded',
        color: '#8c8f99',
    },
    [IMPORT_STATUS.FAILED]: {
        label: 'Failed',
        color: '#d4380d',
    },
}

export const STATUS_OPTIONS = [
    { label: 'All Status', value: 'all' },
    { label: 'Registered', value: IMPORT_STATUS.REGISTERED },
    { label: 'Uploaded', value: IMPORT_STATUS.UPLOADED },
    { label: 'Failed', value: IMPORT_STATUS.FAILED },
]
