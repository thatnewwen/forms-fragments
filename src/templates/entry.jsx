import React from "react";
import PropTypes from "prop-types";
import { BodyText } from "../slices";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import {
  Layout,
  Listing,
  Wrapper,
  SliceZone,
  Title,
  SEO,
  Header,
} from "../components";
import Categories from "../components/Listing/Categories";
import website from "../../config/website";

const Hero = styled.header`
  padding-top: 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding-top: 0rem;
  }
  h1 {
    font-size: 14px;
    font-family: "Inter", "Source Sans Pro", -apple-system, "BlinkMacSystemFont";
  }
  .code {
    font-family: "Inter", "Source Sans Pro", -apple-system, "BlinkMacSystemFont";
    font-size: 10px;
    margin-top: 2px;
    position: absolute;
    margin-left: -40px;
    font-weight: 400;
    @media (max-width: ${(props) => props.theme.breakpoints.m}) {
      display: none;
    }
  }
`;

const Headline = styled.p`
  font-family: "Inter", "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  color: ${(props) => props.theme.colors.grey};
  font-size: 1.25rem;
  a {
    font-style: normal;
    font-weight: normal;
  }
`;

const Entryy = styled.p`
  font-size: 12px;
  max-width: 620px;
  font-family: "Inter", "Source Sans Pro";
  padding-bottom: 40px;
`;

const EntryWrapper = Wrapper.withComponent("main");

const Entry = ({ data: { prismicEntry }, location }) => {
  const { data } = prismicEntry;

  // const renderEssays = () => {
  //   if (data.essays) {
  //     return <SliceZone allSlices={data.essays.document} />;
  //   }
  // };
  return (
    <Layout customSEO>
      <SEO
        title={`${data.title.text} | ${website.titleAlt}`}
        pathname={location.pathname}
        desc={data.title.text}
        node={prismicEntry}
        article
      />
      <Header />
      <Hero>
        <Wrapper>
          {/* <Headline>{data.date}</Headline> */}
          <h1 className="code">{data.key.text}</h1>
          <h1>
            {data.title.text} / {data.artist.text}
          </h1>
        </Wrapper>
      </Hero>
      <EntryWrapper id={website.skipNavId}>
        <Entryy>
          <BodyText key={data.title.text} input={data.body.html} />
        </Entryy>
        {/* {renderEssays()} */}
      </EntryWrapper>
    </Layout>
  );
};

export default Entry;

Entry.propTypes = {
  data: PropTypes.shape({
    prismicEntry: PropTypes.object.isRequired,
    entries: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

// The typenames come from the slice names
// If this doesn't work for you query for __typename in body {} and GraphiQL will show them to you

export const pageQuery = graphql`
  query EntryBySlug($uid: String!) {
    prismicEntry(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        artist {
          text
        }
        body {
          html
        }
        category {
          document {
            data {
              name
            }
          }
        }
        key {
          text
        }
      }
    }
    entries: allPrismicEntry(
      limit: 2
      sort: { fields: [data___date], order: DESC }
      filter: { uid: { ne: $uid } }
    ) {
      nodes {
        uid
        data {
          title {
            text
          }
          artist {
            text
          }
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
  }
`;
