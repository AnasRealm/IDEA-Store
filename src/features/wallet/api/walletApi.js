import api from "../../../api/axios";

export const fetchWalletTransactions = async (page = 1) => {
  const response = await api.get(`/user/transactions?page=${page}`);
  return response.data;
};

export const fetchDeposits = async (page = 1) => {
  const response = await api.get(`/deposits?page=${page}`);
  return response.data;
};

export const fetchWalletBalance = async () => {
  const response = await api.get("/wallet/balance");
  return response.data;
};

export const transferBalance = async (transferData) => {
  const response = await api.post("/wallet/transfer", transferData);
  return response.data;
};
export const fetchWalletStatistics = async () => {
  const response = await api.get('/user/wallet/statistics');
  return response.data;
};

export const depositFunds = async (depositData) => {
  
  const response = await api.post('/deposits', depositData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
export const fetchPaymentGateways = async () => {
  const response = await api.get('/payment-gateways');
  return response.data;
};
export const fetchGatewayAccounts = async (gatewayId) => {
  const response = await api.get(`/payment-gateways/${gatewayId}/accounts`);
  return response.data;
};
export const fetchAccountDeposits = async (accountId) => {
  const response = await api.get(`/payment-accounts/${accountId}/my-deposits`);
  return response.data;
};
export const fetchGatewayDeposits = async (gatewayId) => {
  const response = await api.get(`/payment-gateways/${gatewayId}/deposits`);
  return response.data;
};