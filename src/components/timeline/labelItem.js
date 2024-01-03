import styled from "styled-components";

export const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const StyledDate = styled.div`
  font-size: 18px;
`;

const LabelItem = ({ name, dateStart, dateEnd }) => {
  return (
    <>
      <StyledTitle>{name}</StyledTitle>
      <StyledDate>{`${dateStart} - ${dateEnd}`}</StyledDate>
    </>
  );
};

export default LabelItem;
