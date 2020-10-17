import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const Content = styled.div`
  max-width: ${(props) => props.theme.maxWidthText};
  li {
    font-size: 11px;
    font-family: "Source Sans Pro";
  }
`;
const Title = styled.h2`
  font-size: 12px;
  font-family: "Source Sans Pro";
  position: absolute;
  transform: translateX(-100%) rotate(-90deg);
  transform-origin: right;
  margin-left: -20px;
  font-weight: 700;
  text-transform: uppercase;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    position: relative;
    transform: none;
    margin-left: 0px;
    transform-origin: none;
  }
`;

const BodyText = ({ input }) => (
  <div>
    <Content dangerouslySetInnerHTML={{ __html: input }} />
  </div>
);

export default BodyText;

BodyText.propTypes = {
  input: PropTypes.object.isRequired,
};
