import React from "react";
import { Card, Input } from "antd";
import styled from "styled-components";

import useGemini from "../../hooks/useGemini";
import ChatComponent from "./chatComponent";

const { Search } = Input;

const StyledCard = styled(Card)`
  width: 400px;
  height: 400px;
  z-index: 5;

  @media (max-width: 900px) {
    width: 100%;
    height: 300px;
  }

  & .ant-card-body {
    padding: 10px !important;
  }
`;

const AssistantComponent = () => {
  const { search, setSearch, history, loading, createHistoryElement } =
    useGemini();
  const handleInput = () => createHistoryElement("USER", search);
  const handleChange = (e) => setSearch(e.target.value);

  return (
    <StyledCard
      title="AI assistant"
      actions={[
        <Search
          placeholder="Ask something about my experience"
          value={search}
          style={{ paddingLeft: 15, paddingRight: 15 }}
          onChange={handleChange}
          onSearch={handleInput}
          enterButton="Search"
          size="large"
          loading={false}
        />,
      ]}
    >
      <ChatComponent history={history} loading={loading} />
    </StyledCard>
  );
};

export default AssistantComponent;
