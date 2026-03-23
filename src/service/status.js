import api from '@/service/axios';

export async function fetchStatus(body = {}) {
  const data = await api.post('/status', body);
  return data
}