import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ListItem from "./ListItem";

const List = styled.ul`
  margin-top: 4rem;
  margin-bottom: 4rem;
  list-style-type: none;
  margin-left: 0;
`;

export default class Listing extends Component {
  render() {
    const { entries, type } = this.props;
    return (
      <List>
        {entries.map((entry) => {
          if (entry.data.category) {
            return (
              <ListItem
                key={entry.data.uid}
                type={type}
                node={entry}
                categories={entry.data.category.name}
              />
            );
          }
        })}
      </List>
    );
  }
}

Listing.propTypes = {
  entries: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};
