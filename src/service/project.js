import api from '@/service/axios';

export async function fetchProjects(body = {}) {
  const data = await api.post('/projects', body);
  return data
}