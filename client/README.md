# 📊 Credit Risk Analytics Dashboard

A full-stack credit risk analytics dashboard built with **React**, **TypeScript**, **Ant Design**, **Recharts**, and **Node.js** (via mock JSON API). This dashboard visualizes customer credit data to assess and display risk levels interactively.

---

## 🚀 Features

- 🌞🌙 Light/Dark mode toggle in the header
- 📈 Line chart comparing income vs expenses
- 🥧 Pie chart showing distribution of risk levels
- 📋 Customer table with risk metrics, status, and filters
- 🧮 Dynamic credit risk scoring logic
- 🔁 Reusable components and type-safe code
- 🧪 Sample data via JSON Server

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI**: Ant Design
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Mock Backend**: JSON Server

---

## 📁 Project Structure

credit-risk-dashboard/ ├── public/ ├── src/ │ ├── components/ │ │ ├── OverviewDashboard.tsx │ │ ├── RiskAssessment.tsx │ │ ├── WorkflowManager.tsx │ ├── services/ │ │ └── api.ts │ ├── types/ │ │ └── index.ts
│ ├── App.tsx │ ├── main.tsx ├── db.json ├── package.json ├── tsconfig.json └──

##Steps to install and run the project
**For Client Folder **

- Do Npm install and run command npm start
  **For Server Folder **
  Do Npm install and run command npm start

🤖 AI Tool Usage
💬 I used ChatGPT to guide me step-by-step — especially for backend development which I was unfamiliar with.

It helped me:

-Set up Express routes, CORS, and data simulation
-Write the risk scoring logic

### 📊 1. Dashboard Overview

- **Cards & Stats** showing total customers and total account balance
- **Line Chart** of Income vs. Expenses (Recharts)
- **Pie Chart** for risk score distribution
- **Sortable, filterable table** of customer data

### ⚠️ 2. Risk Assessment

- Custom **risk score formula** based on:
  - Credit Score
  - Loan Repayment History
  - Loan-to-Income Ratio
- Color-coded score display using AntD **Progress bar + Tag**

### 🔁 3. Workflow Automation

- Ant Design **Select & Form** to update customer status
- **PATCH API** updates data and re-renders UI
- Sends simulated **alert for high-risk customers** (if score > 70)

---

## 🧠 Risk Scoring Logic

```ts
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
```
