const _ = require("lodash");

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = (promise) =>
  promise.then((result) => {
    if (result.errors) {
      throw result.errors;
    }
    return result;
  });

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const entryTemplate = require.resolve("./src/templates/entry.jsx");
  const categoryTemplate = require.resolve("./src/templates/category.jsx");

  const result = await wrapper(
    graphql(`
      {
        allPrismicEntry {
          edges {
            node {
              id
              uid
              data {
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
      }
    `)
  );

  const categorySet = new Set();
  const entriesList = result.data.allPrismicEntry.edges;

  // Double check that the post has a category assigned
  entriesList.forEach((edge) => {
    if (edge.node.data.category) {
      categorySet.add(edge.node.data.category.document[0].data.name);
    }

    // The uid you assigned in Prismic is the slug!
    createPage({
      path: `/${edge.node.uid}`,
      component: entryTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
      },
    });
  });

  // const categoryList = Array.from(categorySet);

  // categoryList.forEach((category) => {
  //   createPage({
  //     path: `/categories/${_.kebabCase(category)}`,
  //     component: categoryTemplate,
  //     context: {
  //       category,
  //     },
  //   });
  // });
};
