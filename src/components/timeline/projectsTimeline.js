import { Timeline } from "antd";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin-top: 25px;
`;

const ProjectsTimeline = ({ items }) => {
  return (
    <StyledContainer>
      <Timeline items={items} mode="left" />
    </StyledContainer>
  );
};

export default ProjectsTimeline;
