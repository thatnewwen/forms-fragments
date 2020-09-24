import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";

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

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    position: relative;
    transform: none;
    width: fit-content;
    margin-bottom: 2rem;
    margin-left: 1.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    margin-bottom: 0.5rem;
    font-style: normal;
    color: black;
  }
`;

const HeroInner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    padding: 0 1.5rem;
  }

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

class Header extends Component {
  render() {
    // const {
    //   data: { homepage },
    // } = this.props;
    return (
      <Hero>
        <HeroInner>
          {/* <h4>{homepage.data.title.text}</h4> */}
          <a href="/">
            <Link to="/">forms/fragments</Link>
          </a>
          {/* <HeroText
            dangerouslySetInnerHTML={{ __html: homepage.data.content.html }}
          /> */}
          <HeroText
            dangerouslySetInnerHTML={{ __html: `<p>a media journal</p>` }}
          />
        </HeroInner>
      </Hero>
    );
  }
}

export default Header;

Header.propTypes = {
  data: PropTypes.shape({
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
  }).isRequired,
};

export const pageQuery = graphql`
  query HeaderQuery {
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
  }
`;
