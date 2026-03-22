import { IMPORT_STATUS } from '../constants/importStatus'

const MOCK_IMPORT_FILES = [
    {
        id: 1,
        batchExecutable: true,
        fileName: 'user_import_20250115.csv',
        status: IMPORT_STATUS.REGISTERED,
        organization: 'Organization A',
        uploadTime: '2025/01/15 10:30',
        uploaderName: 'Taro Tanaka',
        completedTime: '2025/01/15 10:35',
    },
    {
        id: 2,
        batchExecutable: true,
        fileName: 'user_import_20250114.csv',
        status: IMPORT_STATUS.UPLOADED,
        organization: 'Organization B',
        uploadTime: '2025/01/14 15:20',
        uploaderName: 'Hanako Sato',
        completedTime: '-',
    },
    {
        id: 3,
        batchExecutable: false,
        fileName: 'user_import_20250113.csv',
        status: IMPORT_STATUS.FAILED,
        organization: 'Organization C',
        uploadTime: '2025/01/13 09:15',
        uploaderName: 'Yuki Suzuki',
        completedTime: '2025/01/13 09:18',
    },
    {
        id: 4,
        batchExecutable: true,
        fileName: 'user_import_20250112.csv',
        status: IMPORT_STATUS.REGISTERED,
        organization: 'Organization A',
        uploadTime: '2025/01/12 14:45',
        uploaderName: 'Ken Yamada',
        completedTime: '2025/01/12 14:50',
    },
    {
        id: 5,
        batchExecutable: false,
        fileName: 'user_import_20250111.csv',
        status: IMPORT_STATUS.UPLOADED,
        organization: 'Organization B',
        uploadTime: '2025/01/11 11:30',
        uploaderName: 'Rina Takahashi',
        completedTime: '-',
    },
    {
        id: 6,
        batchExecutable: false,
        fileName: 'user_import_20250110.csv',
        status: IMPORT_STATUS.REGISTERED,
        organization: 'Organization C',
        uploadTime: '2025/01/10 16:20',
        uploaderName: 'Akiro Nakamura',
        completedTime: '2025/01/10 16:25',
    },
    {
        id: 7,
        batchExecutable: false,
        fileName: 'user_import_20250109.csv',
        status: IMPORT_STATUS.REGISTERED,
        organization: 'Organization A',
        uploadTime: '2025/01/09 08:50',
        uploaderName: 'Mika Kobayashi',
        completedTime: '2025/01/09 08:55',
    },
    {
        id: 8,
        batchExecutable: false,
        fileName: 'user_import_20250108.csv',
        status: IMPORT_STATUS.FAILED,
        organization: 'Organization B',
        uploadTime: '2025/01/08 13:40',
        uploaderName: 'Aoi Watanabe',
        completedTime: '2025/01/08 13:42',
    },
    {
        id: 9,
        batchExecutable: false,
        fileName: 'user_import_20250107.csv',
        status: IMPORT_STATUS.REGISTERED,
        organization: 'Organization C',
        uploadTime: '2025/01/07 10:25',
        uploaderName: 'Shota Ito',
        completedTime: '2025/01/07 10:30',
    },
    {
        id: 10,
        batchExecutable: true,
        fileName: 'user_import_20250106.csv',
        status: IMPORT_STATUS.UPLOADED,
        organization: 'Organization A',
        uploadTime: '2025/01/06 15:10',
        uploaderName: 'Nao Yagi',
        completedTime: '-',
    },
]

const MOCK_IMPORTED_ROWS_BY_FILE_ID = {
    1: [
        {
            rowNo: 1,
            userId: 'U1001',
            fullName: 'Taro Tanaka',
            email: 'taro@example.com',
            role: 'Admin',
        },
        {
            rowNo: 2,
            userId: 'U1002',
            fullName: 'Hanako Sato',
            email: 'hanako@example.com',
            role: 'Operator',
        },
        {
            rowNo: 3,
            userId: 'U1003',
            fullName: 'Ken Yamada',
            email: 'ken@example.com',
            role: 'Viewer',
        },
    ],
    2: [
        {
            rowNo: 1,
            userId: 'U1201',
            fullName: 'Rina Takahashi',
            email: 'rina@example.com',
            role: 'Operator',
        },
        {
            rowNo: 2,
            userId: 'U1202',
            fullName: 'Aoi Watanabe',
            email: 'aoi@example.com',
            role: 'Viewer',
        },
    ],
    10: [
        {
            rowNo: 1,
            userId: 'U1401',
            fullName: 'Nao Yagi',
            email: 'nao@example.com',
            role: 'Admin',
        },
        {
            rowNo: 2,
            userId: 'U1402',
            fullName: 'Shota Ito',
            email: 'shota@example.com',
            role: 'Operator',
        },
        {
            rowNo: 3,
            userId: 'U1403',
            fullName: 'Mika Kobayashi',
            email: 'mika@example.com',
            role: 'Viewer',
        },
        {
            rowNo: 4,
            userId: 'U1404',
            fullName: 'Yuki Suzuki',
            email: 'yuki@example.com',
            role: 'Operator',
        },
    ],
}

function isDateInRange(target, from, to) {
    if (!from && !to) {
        return true
    }

    const targetTime = new Date(target.replace(/\//g, '-')).getTime()
    const fromTime = from ? new Date(from).setHours(0, 0, 0, 0) : null
    const toTime = to ? new Date(to).setHours(23, 59, 59, 999) : null

    if (fromTime && targetTime < fromTime) {
        return false
    }
    if (toTime && targetTime > toTime) {
        return false
    }
    return true
}

export function fetchImportFiles(filters) {
    const {
        status,
        organization,
        uploadDateFrom,
        uploadDateTo,
        batchExecutionDateFrom,
        batchExecutionDateTo,
    } = filters

    const filtered = MOCK_IMPORT_FILES.filter((item) => {
        const statusMatched = status === 'all' || item.status === status
        const organizationMatched =
            organization === 'all' || item.organization === organization
        const uploadMatched = isDateInRange(
            item.uploadTime,
            uploadDateFrom,
            uploadDateTo,
        )
        const executionMatched = isDateInRange(
            item.completedTime === '-' ? item.uploadTime : item.completedTime,
            batchExecutionDateFrom,
            batchExecutionDateTo,
        )

        return (
            statusMatched &&
            organizationMatched &&
            uploadMatched &&
            executionMatched
        )
    })

    return Promise.resolve(filtered)
}

export function fetchImportedCsvData(fileId) {
    const numericId = Number(fileId)
    return Promise.resolve(MOCK_IMPORTED_ROWS_BY_FILE_ID[numericId] || [])
}
