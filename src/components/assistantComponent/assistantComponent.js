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
  const { history, loading, askAI, setSearch, search } = useGemini();

  return (
    <StyledCard
      title="AI assistant"
      actions={[
        <Search
          allowClear={true}
          placeholder="Ask something about my experience"
          style={{ paddingLeft: 15, paddingRight: 15 }}
          onSearch={() => askAI()}
          onChange={(e) => setSearch(e.target.value)}
          enterButton="Search"
          size="large"
          loading={loading}
          value={search}
        />,
      ]}
    >
      <ChatComponent history={history} loading={loading} />
    </StyledCard>
  );
};

export default AssistantComponent;
