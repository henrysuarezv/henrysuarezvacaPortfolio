import { Timeline } from "antd";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin-top: 25px;
  @media (max-width: 900px) {
    height: 55vh;
    overflow-y: scroll;
    display: block;
    position: relative;
  }
`;

const ProjectsTimeline = ({ items }) => {
  return (
    <StyledContainer>
      <Timeline items={items} mode="left" />
    </StyledContainer>
  );
};

export default ProjectsTimeline;
