import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from "gatsby";
import Categories from "./Categories";

const Item = styled.li`
  margin-bottom: 1.45rem;
`;

const Headline = styled.p`
  font-family: "Inter", "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 0;
  font-size: 10px;
  text-transform: uppercase;
  a {
    color: ${(props) => props.theme.colors.black};
    font-style: normal;
    font-weight: normal;
  }
`;

const StyledLink = styled(Link)`
  font-family: "Inter", "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  font-style: normal;
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 1.777rem;
  }
`;

export default class ListItem extends Component {
  render() {
    const { node, type } = this.props;
    let key;
    if (type === 'longform') {
      console.log(node.uid)
      key = 'longforms/' + node.uid
    } else {
      key = 'shorts/' + node.uid
    }
    return (
      <Item>
        <StyledLink to={key}>{node.data.title.text}</StyledLink>
        <Headline>{node.data.artist.text}</Headline>
      </Item>
    );
  }
}

ListItem.propTypes = {
  node: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
