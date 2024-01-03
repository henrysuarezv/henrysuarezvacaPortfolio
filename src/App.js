import React from "react";
import { Layout } from "antd";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import store from "./store";
import Home from "./pages/home";

const StyledContent = styled(Layout.Content)`
  padding: 0 48px;
  @media (max-width: 900px) {
    padding: 0 10px;
  }
`;
const StyledHeader = styled(Layout.Header)`
  text-align: center;
  color: #fff;
  height: 64px;
  font-weight: bold;
  font-size: 24px;
  padding-inline: 48px;
  line-height: 64px;
  @media (max-width: 900px) {
    font-size: 16px;
    padding-inline: 24px;
  }
`;

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <StyledHeader> Henry Suarez Vaca - Portfolio</StyledHeader>
        <StyledContent>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </StyledContent>
      </Layout>
    </Provider>
  );
}

export default App;
