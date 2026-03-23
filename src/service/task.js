import api from '@/service/axios';

export async function fetchTasks(body = {}) {
  const data = await api.post('/tasks', body);
  return data
}