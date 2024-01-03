import React, { useRef, useEffect } from "react";
import { Spin } from "antd";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  display: block;
  max-height: 250px;
  height: 250px;
  @media (max-width: 900px) {
    max-height: 150px;
    height: 150px;
  }
`;

const StyledMessage = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-start;
  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 10px;
  }
  & .message-content {
    flex-grow: 1;
  }
  & .message-bubble {
    background-color: #dcf8c6;
    padding: 8px;
    border-radius: 8px;
    word-wrap: break-word;
  }

  & .own-message {
    align-self: flex-end;
  }

  & .own-message .message-bubble {
    background-color: #dcf8c6;
  }
`;

const StyledSystemMessage = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 12;
  padding: 15;
  color: rgba(0, 0, 0, 0.45);
`;

const ChatComponent = ({ history, loading }) => {
  const chatContainerRef = useRef();
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [history, loading]);
  return (
    <StyledContainer ref={chatContainerRef}>
      <StyledSystemMessage>
        Use my AI assistant to explore my professional journey.
      </StyledSystemMessage>
      {history.map((elem) => {
        if (elem.role === "AI") {
          return (
            <StyledMessage key={elem.key}>
              <img src="assistant.jpeg" alt="AI Avatar" />
              <div className="message-content">
                <div className="message-bubble">{elem.text}</div>
              </div>
            </StyledMessage>
          );
        }
        if (elem.role === "USER") {
          return (
            <StyledMessage className="own-message" key={elem.key}>
              <div className="message-content">
                <div className="message-bubble">{elem.text}</div>
              </div>
              <img src="guest.jpeg" alt="User Avatar" />
            </StyledMessage>
          );
        }
        return <StyledSystemMessage>{elem.text}</StyledSystemMessage>;
      })}
      {loading && <Spin style={{ width: "100%" }} />}
    </StyledContainer>
  );
};

export default ChatComponent;
