import React from "react";
import { LinkOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Avatar, Card, Tag } from "antd";
import { StyledTitle, StyledDate } from "./labelItem";

const { Meta } = Card;
const skillsColors = {
  JavaScript: "success",
  "React.js": "processing",
  PHP: "warning",
  Selenium: "magenta",
  Angular: "error",
  "Node.js": "volcano",
  MongoDB: "orange",
  Typescript: "gold",
  JQuery: "lime",
  MySQL: "cyan",
  Laravel: "geekblue",
  "React Native": "purple",
  meteor: "error",
};
const ItemTimeline = ({
  associated,
  description,
  skills,
  urls,
  associatedImage,
  role,
  name,
  isMobile,
  dateStart,
  dateEnd,
}) => {
  return (
    <Card
      actions={urls.map(({ url, label }) => (
        <a href={url} target="_hblank">
          <LinkOutlined style={{ paddingRight: "5px" }} />
          {label}
        </a>
      ))}
    >
      <Meta
        avatar={<Avatar alt={associated} src={associatedImage} />}
        title={
          associated !== "Freelancer"
            ? `Associated with ${associated}`
            : "Worked as Freelancer"
        }
        description={
          <>
            {isMobile && (
              <>
                <StyledTitle>{name}</StyledTitle>{" "}
                <StyledDate>{`${dateStart} - ${dateEnd}`}</StyledDate>
              </>
            )}
            <div
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                paddingBottom: 10,
              }}
            >
              Worked as {role}
            </div>
            <div>{description}</div>
            <div style={{ paddingTop: "10px" }}>
              {skills.split(",").map((skill) => {
                return (
                  <Tag
                    icon={<CheckCircleOutlined />}
                    color={skillsColors[skill]}
                    key={skill}
                  >
                    {skill}
                  </Tag>
                );
              })}
            </div>
          </>
        }
      />
    </Card>
  );
};
export default ItemTimeline;
