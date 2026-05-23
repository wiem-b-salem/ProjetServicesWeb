import axios from 'axios';

export const SERVICES = {
  auth:         'http://localhost:3001',
  vehicle:      'http://localhost:3002',
  traffic:      'http://localhost:3003',
  incident:     'http://localhost:3004',
  notification: 'http://localhost:3005',
};

export async function post(url: string, data?: any) {
  const res = await axios.post(url, data);
  return res.data;
}

export async function get(url: string) {
  const res = await axios.get(url);
  return res.data;
}

export async function patch(url: string, data?: any) {
  const res = await axios.patch(url, data);
  return res.data;
}