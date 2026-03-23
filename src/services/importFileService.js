import api from "@/service/axios";
import { IMPORT_STATUS } from "../constants/importStatus";

const MOCK_IMPORTED_TASKS_DATA = {
  data: [
    {
      TaskName: "t-588 KIT",
      Description:
        "Trong màn hình Tạo Guidance KIT, khi thực hiện sắp xếp tại danh sách đối tượng gửi theo 【退職日】, tất cả dữ liệu đều để trống nhưng mỗi lần click vào tiêu đề thì thứ tự lại thay đổi.",
      TaskCode: "EMPOR07-747",
      ProjectCode: "EMPOR07",
      Project: "EMPOR07",
      Assign: "ca24y",
      StatusCode: "Status2",
      TaskStatus: "New",
    },
    {
      TaskName: "t-589 KIT",
      Description: "Test Description",
      TaskCode: "EMPOR07-748",
      ProjectCode: "EMPOR06",
      Project: "EMPOR06",
      Assign: "S0001595",
      StatusCode: "Status5",
      TaskStatus: "Completed",
    },
  ],
};

function pushCondition(conditions, id, value, operator = "eq") {
  if (value === undefined || value === null || value === "") {
    return;
  }
  conditions.push({ id, value, operator });
}

export function buildImportTaskListParams({
  filters = {},
  pagination = {},
  sorter = null,
  sort_fields,
} = {}) {
  const conditions = [];

  if (filters.status && filters.status !== "all") {
    pushCondition(conditions, "status", filters.status);
  }

  pushCondition(conditions, "upload_time", filters.uploadDateFrom, "gte");
  pushCondition(conditions, "upload_time", filters.uploadDateTo, "lte");
  pushCondition(
    conditions,
    "completed_time",
    filters.batchExecutionDateFrom,
    "gte"
  );
  pushCondition(
    conditions,
    "completed_time",
    filters.batchExecutionDateTo,
    "lte"
  );

  const body = {
    per_page: Number(pagination.pageSize) || 5,
    page: Number(pagination.current) || 1,
    use_or_condition: false,
    conditions,
  };

  if (sort_fields && Array.isArray(sort_fields) && sort_fields.length > 0) {
    body.sort_fields = sort_fields;
  } else if (sorter && sorter.field && sorter.order) {
    body.sort_field_id = sorter.field;
    body.sort_order = sorter.order;
  }

  return body;
}

export async function fetchImportFiles(body = {}) {
  const response = await api.post("/import-task-management", body);
  const rawItems = response?.items || response?.data || [];

  const items = rawItems.map((item) => ({
    id: item.ImportID,
    fileName: item.DataFileName || "-",
    status: normalizeImportStatus(item.StatusImport),
    rawStatus: item.StatusImport,
    uploadTime: item.UploadDate || "-",
    uploaderName: item.UploadUser || "-",
    completedTime: item.BatchCompleteDate || "-",
    batchExecutable:
      item.batchExecutable !== undefined
        ? Boolean(item.batchExecutable)
        : normalizeImportStatus(item.Status) === IMPORT_STATUS.UPLOADED,
    totalTaskImport: item.TotalTaskImport,
    source: item,
  }));

  return {
    ...response,
    items,
    totalItems: Number(response?.totalItems ?? response?.total ?? items.length),
  };
}

function normalizeImportStatus(status) {
  if (!status) return IMPORT_STATUS.UPLOADED;

  const value = String(status).toLowerCase();
  const map = {
    registered: IMPORT_STATUS.REGISTERED,
    uploaded: IMPORT_STATUS.UPLOADED,
    failed: IMPORT_STATUS.FAILED,
    processing: IMPORT_STATUS.PROCESSING,
    status1: IMPORT_STATUS.UPLOADED,
    status2: IMPORT_STATUS.REGISTERED,
    status3: IMPORT_STATUS.FAILED,
    status4: IMPORT_STATUS.PROCESSING,
  };

  return map[value] || IMPORT_STATUS.UPLOADED;
}

export function fetchImportedCsvData() {
  return Promise.resolve(MOCK_IMPORTED_TASKS_DATA);
}
