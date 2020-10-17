import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { graphql } from "gatsby";
import { Header, Layout, SliceZone, Wrapper, Title } from "../components";
import website from "../../config/website";

const Hero = styled.header`
  background-color: ${(props) => props.theme.colors.yellow};
  position: fixed;
  bottom: 0;
  right: 0;
  -webkit-transform: rotate(90deg);
  -webkit-transform-origin: right top;
  -moz-transform: rotate(90deg);
  -moz-transform-origin: right top;
  -ms-transform: rotate(90deg);
  -ms-transform-origin: right top;
  -o-transform: rotate(90deg);
  -o-transform-origin: right top;
  transform: rotate(90deg);

  p {
    margin-bottom: 1rem;
  }

  h4 {
    margin-bottom: 0.5rem;
  }
`;

const HeroInner = styled(Wrapper)`
  padding-top: 2rem;
  padding-bottom: 1rem;
  h1 {
    margin-bottom: 2rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }
`;

const HeroText = styled.div`
  font-size: 0.7rem;
  line-height: 1.4;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    font-size: 0.7rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    font-size: 0.7rem;
  }
`;

const Social = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  li {
    display: inline;
    &:not([data-name="social-entry-0"]) {
      margin-left: 2.5rem;
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        margin-left: 1.75rem;
      }
    }
    a {
      font-style: normal;
      color: ${(props) => props.theme.colors.greyDark};
      font-size: 1.333rem;
      font-weight: 600;
      &:hover,
      &:focus {
        color: ${(props) => props.theme.colors.primary};
        text-decoration: none;
      }
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        font-size: 1.2rem;
      }
    }
  }
`;

const ProjectListing = styled.ul`
  list-style-type: none;
  margin-left: 0;
  margin-top: 4rem;
  li {
    margin-bottom: 1.45rem;
    a {
      font-size: 2.369rem;
      font-style: normal;
      color: ${(props) => props.theme.colors.black};
      @media (max-width: ${(props) => props.theme.breakpoints.s}) {
        font-size: 1.777rem;
      }
    }
  }
`;

const FullWrapper = Wrapper.withComponent("main");

class Full extends Component {
  render() {
    const {
      data: { social, entries, projects, index },
    } = this.props;
    return (
      <Layout>
        <Header />
        <FullWrapper
          id={website.skipNavId}
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <Title style={{ marginTop: "4rem" }}>Index</Title>
          <SliceZone allSlices={index.data.body} />
        </FullWrapper>
      </Layout>
    );
  }
}

export default Full;

Full.propTypes = {
  data: PropTypes.shape({
    index: PropTypes.object.isRequired,
    homepage: PropTypes.shape({
      data: PropTypes.shape({
        title: PropTypes.shape({
          text: PropTypes.string.isRequired,
        }),
        content: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }),
      }),
    }),
    social: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    entries: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    projects: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query FullQuery {
    index: prismicIndex {
      data {
        body {
          ... on PrismicIndexBodyEntry {
            slice_type
            id
            primary {
              title {
                text
              }
              notes {
                html
              }
            }
          }
        }
      }
    }
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        content {
          html
        }
      }
    }
    social: allPrismicHeroLinksBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
    entries: allPrismicEntry(sort: { fields: [data___date], order: DESC }) {
      nodes {
        uid
        data {
          title {
            text
          }
          artist {
            text
          }
          date(formatString: "DD.MM.YYYY")
          category {
            document {
              data {
                name
              }
            }
          }
        }
      }
    }
    projects: allPrismicProjectsBodyLinkItem {
      nodes {
        primary {
          label {
            text
          }
          link {
            url
          }
        }
      }
    }
  }
`;
