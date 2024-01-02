import data from "../data.json";
import ProjectsTimeline from "./timeline/projectsTimeline";
import ItemTimeline from "./timeline/itemTimeline";
import LabelItem from "./timeline/labelItem";

const ProjectsContainer = () => {
  const items = data.jobs.map((item) => ({
    label: LabelItem(item),
    color: "green",
    children: ItemTimeline(item),
  }));
  return <ProjectsTimeline items={items} />;
};

export default ProjectsContainer;
