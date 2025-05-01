import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu, Switch, ConfigProvider, theme } from "antd";
import OverviewDashboard from "./components/OverviewDashboard";
import RiskAssessment from "./components/RiskAssessment";
import WorkflowManager from "./components/WorkflowManager";

const { Header, Content } = Layout;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Router>
        <Layout>
          <Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Menu theme="dark" mode="horizontal" style={{ flex: 1 }}>
              <Menu.Item key="1">
                <Link to="/">Overview</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/risk">Risk Assessment</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/workflow">Workflow</Link>
              </Menu.Item>
            </Menu>
            <Switch
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              style={{ marginLeft: "auto", marginRight: "16px" }}
            />
          </Header>

          <Content style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<OverviewDashboard />} />
              <Route path="/risk" element={<RiskAssessment />} />
              <Route path="/workflow" element={<WorkflowManager />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App;
