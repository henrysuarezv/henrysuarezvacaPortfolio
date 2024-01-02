import React from "react";
import { Affix } from "antd";
import ProjectsContainer from "../components/projectsContainer";
import AssistantComponent from "../components/assistantComponent/assistantComponent";

function Home() {
  return (
    <>
      <Affix style={{ position: "absolute", bottom: 25, left: 25 }} >
        <AssistantComponent />
      </Affix>
      <ProjectsContainer />
    </>
  );
}

export default Home;
