import React from "react";
import { Affix } from "antd";
import { useMediaQuery } from "react-responsive";

import ProjectsContainer from "../components/projectsContainer";
import AssistantComponent from "../components/assistantComponent/assistantComponent";

function Home() {
  const isMobile = useMediaQuery({ query: `(max-width: 900px)` });

  return (
    <>
      {!isMobile && (
        <Affix style={{ position: "absolute", bottom: 25, left: 25 }}>
          <AssistantComponent />
        </Affix>
      )}
      <ProjectsContainer />
      {isMobile && <AssistantComponent />}
    </>
  );
}

export default Home;
