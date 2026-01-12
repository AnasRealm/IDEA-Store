import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  fetchWalletTransactions,
  fetchWalletBalance,
  transferBalance,
  fetchWalletStatistics,
  fetchDeposits,
  depositFunds,
  fetchGatewayAccounts,
  fetchPaymentGateways,
  fetchAccountDeposits,
  fetchGatewayDeposits,
} from "../api/walletApi";

export const useWallet = () => {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("transactions");

  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [selectedGatewayId, setSelectedGatewayId] = useState("");

  const [transferForm, setTransferForm] = useState({
    email: "",
    amount: "",
    description: "",
  });
  const [depositForm, setDepositForm] = useState({
    amount: "",
    gateway_account_id: "",
    proof_image: null,
  });

  const queryClient = useQueryClient();

  const currentActiveTab = activeTab;
  const [lastActiveTab, setLastActiveTab] = useState(currentActiveTab);

  if (currentActiveTab !== lastActiveTab) {
    setPage(1);
    setLastActiveTab(currentActiveTab);
  }

  const { data: balanceResponse } = useQuery({
    queryKey: ["walletBalance"],
    queryFn: fetchWalletBalance,
  });

  const { data: statsResponse, isLoading: isStatsLoading } = useQuery({
    queryKey: ["walletStatistics"],
    queryFn: fetchWalletStatistics,
  });

  const { data: listResponse, isLoading: isListLoading } = useQuery({
    queryKey: ["walletList", activeTab, page],
    queryFn: () =>
      activeTab === "transactions"
        ? fetchWalletTransactions(page)
        : fetchDeposits(page),
    keepPreviousData: true,
  });

  const { data: gatewaysResponse } = useQuery({
    queryKey: ["paymentGateways"],
    queryFn: fetchPaymentGateways,
    enabled: isDepositOpen,
  });

  const { data: accountsResponse, isLoading: isAccountsLoading } = useQuery({
    queryKey: ["gatewayAccounts", selectedGatewayId],
    queryFn: () => fetchGatewayAccounts(selectedGatewayId),
    enabled: !!selectedGatewayId,
  });

  const { data: gatewayHistoryResponse, isLoading: isGatewayHistoryLoading } =
    useQuery({
      queryKey: ["gatewayDeposits", selectedGatewayId],
      queryFn: () => fetchGatewayDeposits(selectedGatewayId),
      enabled: !!selectedGatewayId && !depositForm.gateway_account_id,
    });

  const selectedAccountId = depositForm.gateway_account_id;
  const { data: accountHistoryResponse, isLoading: isAccountHistoryLoading } =
    useQuery({
      queryKey: ["accountDeposits", selectedAccountId],
      queryFn: () => fetchAccountDeposits(selectedAccountId),
      enabled: !!selectedAccountId,
    });

  const balanceInfo = balanceResponse?.data || {
    available_balance: 0,
    frozen_balance: 0,
    total_balance: 0,
  };
  const stats = statsResponse?.data || {
    total_deposits: 0,
    total_purchases: 0,
    orders: {
      completed: 0,
      processing: 0,
      pending: 0,
      rejected: 0,
      refunded: 0,
    },
  };
  const listItems = listResponse?.data?.data || [];
  const meta = listResponse?.data?.meta;
  const gateways = gatewaysResponse?.data || [];
  const accounts = accountsResponse?.data || [];

  let historyList = [];
  let historyTitle = "";
  let isHistoryLoading = false;

  if (selectedAccountId) {
    historyList = accountHistoryResponse?.data || [];
    historyTitle = "Recent Deposits to this Account";
    isHistoryLoading = isAccountHistoryLoading;
  } else if (selectedGatewayId) {
    historyList = gatewayHistoryResponse?.data || [];
    historyTitle = "Recent Deposits via this Method";
    isHistoryLoading = isGatewayHistoryLoading;
  }

  const transferMutation = useMutation({
    mutationFn: transferBalance,
    onSuccess: (data) => {
      setIsTransferOpen(false);
      setTransferForm({ email: "", amount: "", description: "" });
      queryClient.invalidateQueries(["walletBalance"]);
      queryClient.invalidateQueries(["walletList"]);
      queryClient.invalidateQueries(["walletStatistics"]);
      toast.success(data.message || "Transfer successful! 💸");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Transfer failed.");
    },
  });

  const depositMutation = useMutation({
    mutationFn: depositFunds,
    onSuccess: (data) => {
      setIsDepositOpen(false);
      setSelectedGatewayId("");
      setDepositForm({ amount: "", gateway_account_id: "", proof_image: null });
      setActiveTab("deposits");
      queryClient.invalidateQueries(["walletList"]);
      queryClient.invalidateQueries(["walletStatistics"]);
      toast.success(data.message || "Deposit request submitted! 🚀");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Deposit failed. Check your inputs."
      );
    },
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (meta?.last_page || 1)) setPage(newPage);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    transferMutation.mutate(transferForm);
  };

  const handleDepositFileChange = (e) => {
    if (e.target.files[0]) {
      setDepositForm({ ...depositForm, proof_image: e.target.files[0] });
    }
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("amount", depositForm.amount);
    formData.append("gateway_account_id", depositForm.gateway_account_id);
    if (depositForm.proof_image) {
      formData.append("proof_image", depositForm.proof_image);
    }
    depositMutation.mutate(formData);
  };

  const handleGatewayChange = (e) => {
    const newGatewayId = e.target.value;
    setSelectedGatewayId(newGatewayId);
    setDepositForm((prev) => ({ ...prev, gateway_account_id: "" }));
  };

  const getAmountStyle = (amount) => {
    const num = parseFloat(amount);
    const isPositive = activeTab === "deposits" ? true : num > 0;
    return {
      color: isPositive ? "#2ecc71" : "#e74c3c",
      fontWeight: "bold",
      direction: "ltr",
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#2ecc71";
      case "pending":
        return "#f1c40f";
      case "rejected":
        return "#e74c3c";
      default:
        return "#ccc";
    }
  };

  return {
    page,
    activeTab,
    setActiveTab,
    isTransferOpen,
    setIsTransferOpen,
    isDepositOpen,
    setIsDepositOpen,
    selectedGatewayId,
    transferForm,
    setTransferForm,
    depositForm,
    setDepositForm,
    balanceInfo,
    stats,
    isStatsLoading,
    listItems,
    meta,
    isListLoading,
    gateways,
    accounts,
    isAccountsLoading,
    historyList,
    historyTitle,
    isHistoryLoading,
    transferMutation,
    depositMutation,
    handlePageChange,
    handleTransferSubmit,
    handleDepositFileChange,
    handleDepositSubmit,
    handleGatewayChange,
    getAmountStyle,
    getStatusColor,
    selectedAccountId,
  };
};
