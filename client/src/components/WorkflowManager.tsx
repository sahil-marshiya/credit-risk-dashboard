import React from "react";
import { Card, Select, Button, Form } from "antd";

const { Option } = Select;

const WorkflowManager = () => {
  return (
    <Card title="Workflow Automation">
      <Form layout="inline">
        <Form.Item label="Customer Status">
          <Select defaultValue="Review" style={{ width: 150 }}>
            <Option value="Review">Review</Option>
            <Option value="Approved">Approved</Option>
            <Option value="Rejected">Rejected</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary">Update Status</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default WorkflowManager;
