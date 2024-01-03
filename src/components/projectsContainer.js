import data from "../data.json";
import ProjectsTimeline from "./timeline/projectsTimeline";
import ItemTimeline from "./timeline/itemTimeline";
import LabelItem from "./timeline/labelItem";
import { useMediaQuery } from "react-responsive";

const ProjectsContainer = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 900px)` });
  const items = data.jobs.map((item) => ({
    label: isMobile ? null : LabelItem(item),
    color: "green",
    children: ItemTimeline({ ...item, isMobile }),
  }));
  return <ProjectsTimeline items={items} />;
};

export default ProjectsContainer;
