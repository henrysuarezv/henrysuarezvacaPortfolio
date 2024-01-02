import React from "react";
import { Layout } from "antd";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";

import store from "./store";
import Home from "./pages/home";

const { Header, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  fontWeight: "bold",
  fontSize: "24px",
  paddingInline: 48,
  lineHeight: '64px',
};

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header style={headerStyle}> Henry Suarez Vaca - Portfolio</Header>
        <Content style={{ padding: "0 48px" }}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
