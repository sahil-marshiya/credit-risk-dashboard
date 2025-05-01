import React, { useEffect, useState } from "react";
import { Table, Progress, Badge, Tag, Typography, Card } from "antd";
import { fetchCustomers } from "../services/api";
import { Customer } from "../types";

const { Title } = Typography;

// ✅ Updated Risk Score Calculation
const getRiskScore = (customer: Customer) => {
  const repaymentRate =
    customer.loanRepaymentHistory.reduce((sum, val) => sum + val, 0) /
    customer.loanRepaymentHistory.length;

  const loanRatio = customer.outstandingLoans / customer.monthlyIncome;

  const creditScoreComponent = (850 - customer.creditScore) / 850;
  const repaymentComponent = 1 - repaymentRate;
  const loanRatioComponent = Math.min(loanRatio / 5, 1); // Cap at 500%

  const riskScore =
    (creditScoreComponent * 0.4 +
      repaymentComponent * 0.4 +
      loanRatioComponent * 0.2) *
    100;

  return Math.round(riskScore);
};

// ✅ Risk Level Mapping
const getRiskLevel = (score: number) => {
  if (score >= 70) return { level: "High", color: "red" };
  if (score >= 40) return { level: "Medium", color: "orange" };
  return { level: "Low", color: "green" };
};

const RiskAssessment: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers().then((res) => setCustomers(res.data));
  }, []);

  const columns = [
    {
      title: "Customer",
      dataIndex: "name",
    },
    {
      title: "Credit Score",
      dataIndex: "creditScore",
    },
    {
      title: "Repayment History",
      dataIndex: "loanRepaymentHistory",
      render: (history: number[]) =>
        `${history.filter(Boolean).length}/${history.length} paid`,
    },
    {
      title: "Loan/Income %",
      render: (record: Customer) =>
        `${Math.round(
          (record.outstandingLoans / record.monthlyIncome) * 100
        )}%`,
    },
    {
      title: "Risk Score",
      render: (record: Customer) => {
        const score = getRiskScore(record);
        const { color } = getRiskLevel(score);
        return <Progress percent={score} strokeColor={color} />;
      },
      sorter: (a: Customer, b: Customer) => getRiskScore(a) - getRiskScore(b),
    },
    {
      title: "Risk Level",
      render: (record: Customer) => {
        const score = getRiskScore(record);
        const { level, color } = getRiskLevel(score);
        return (
          <>
            <Badge color={color} />
            <Tag color={color}>{level}</Tag>
          </>
        );
      },
    },
  ];

  return (
    <Card>
      <Title level={2}>Risk Assessment & Scoring</Title>
      <Table
        dataSource={customers}
        columns={columns}
        rowKey="customerId"
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default RiskAssessment;
