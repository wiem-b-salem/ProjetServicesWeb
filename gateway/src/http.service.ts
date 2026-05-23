import axios from 'axios';

export const SERVICES = {
  auth:         process.env.AUTH_URL         || 'http://localhost:3001',
  vehicle:      process.env.VEHICLE_URL      || 'http://localhost:3002',
  traffic:      process.env.TRAFFIC_URL      || 'http://localhost:3003',
  incident:     process.env.INCIDENT_URL     || 'http://localhost:3004',
  notification: process.env.NOTIFICATION_URL || 'http://localhost:3005',
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