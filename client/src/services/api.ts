import axios from "axios";

const API_BASE = "http://localhost:5000";

export const fetchCustomers = () => axios.get(`${API_BASE}/customers`);

export const updateCustomerStatus = (customerId: string, status: string) =>
  axios.put(`${API_BASE}/customers/${customerId}`, { status });

export const alertHighRisk = (customerId: string) =>
  axios.post(`${API_BASE}/alerts`, { customerId });
