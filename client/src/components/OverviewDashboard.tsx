import React, { useEffect, useState } from "react";
import { Card, Col, Row, Statistic, Table, Typography } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { fetchCustomers } from "../services/api";
import { Customer } from "../types";

const { Title } = Typography;

const COLORS = ["#0088FE", "#FF8042", "#FF0000"];

const OverviewDashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers().then((res) => {
      setCustomers(res.data);

      // Debugging risk scores
      res.data.forEach((c) => {
        const score = getRiskScore(c);
        console.log(`${c.name}: Risk Score = ${score}`);
      });
    });
  }, []);

  const lineChartData = customers.map((c) => ({
    name: c.name,
    Income: c.monthlyIncome,
    Expenses: c.monthlyExpenses,
  }));

  const riskBuckets = { Low: 0, Medium: 0, High: 0 };

  const getRiskScore = (c: Customer) => {
    const historyScore =
      (c.loanRepaymentHistory.reduce((a, b) => a + b, 0) /
        c.loanRepaymentHistory.length) *
      100;
    const loanRatio = (c.outstandingLoans / c.monthlyIncome) * 100;
    return Math.round(
      (100 - loanRatio + c.creditScore / 10 + historyScore) / 3
    );
  };

  customers.forEach((c) => {
    const score = getRiskScore(c);
    if (score >= 75) riskBuckets.Low++;
    else if (score >= 50) riskBuckets.Medium++;
    else riskBuckets.High++;
  });

  const pieChartData = [
    { name: "Low Risk", value: riskBuckets.Low },
    { name: "Medium Risk", value: riskBuckets.Medium },
    { name: "High Risk", value: riskBuckets.High },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
    },
    {
      title: "Credit Score",
      dataIndex: "creditScore",
      sorter: (a: Customer, b: Customer) => a.creditScore - b.creditScore,
    },
    {
      title: "Monthly Income",
      dataIndex: "monthlyIncome",
      sorter: (a: Customer, b: Customer) => a.monthlyIncome - b.monthlyIncome,
    },
    {
      title: "Expenses",
      dataIndex: "monthlyExpenses",
    },
    {
      title: "Outstanding Loans",
      dataIndex: "outstandingLoans",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <>
      <Title level={2}>Dashboard Overview</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Customers" value={customers.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Average Income"
              value={
                customers.reduce((acc, c) => acc + c.monthlyIncome, 0) /
                (customers.length || 1)
              }
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Average Expenses"
              value={
                customers.reduce((acc, c) => acc + c.monthlyExpenses, 0) /
                (customers.length || 1)
              }
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Income vs Expenses">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Income" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Expenses" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Risk Score Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Customer Table">
            <Table
              columns={columns}
              dataSource={customers}
              rowKey="customerId"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OverviewDashboard;
