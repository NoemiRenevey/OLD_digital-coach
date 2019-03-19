const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const config = require(`./src/utils/siteConfig`)
const { paginate } = require(`gatsby-awesome-pagination`)

/**
* Here is the place where Gatsby creates the URLs for all the
* posts, tags, pages and authors that we fetched from the Ghost site.
*/
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    /**
    * Articles
    */
    const createPosts = new Promise((resolve, reject) => {
        const postTemplate = path.resolve(`./src/templates/post.js`)
        const indexTemplate = path.resolve(`./src/templates/index.js`)
        const goalTemplate = path.resolve(`./src/templates/goal.js`)
        const categoryTemplate = path.resolve(`./src/templates/category.js`)
        resolve(
            graphql(`
              query allArticles {
                articles: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/articles/"}}) {
                  edges {
                    node {
                      frontmatter {
                        title
                        slug
                        goals {
                            id
                        }
                      }
                    }
                  }
                }
                categories: allCategoriesYaml {
                    edges {
                      node {
                        id
                        slug
                      }
                    }
                  }
              }`
            ).then((result) => {
                if (result.errors) {
                    return reject(result.errors)
                }

                if (!result.data.articles) {
                    return resolve()
                }

                const items = result.data.articles.edges

                _.forEach(items, ({ node }) => {
                    // This part here defines, that our posts will use
                    // a `/:slug/` permalink.
                    node.url = `/${node.frontmatter.slug}/`

                    createPage({
                        path: node.url,
                        component: path.resolve(postTemplate),
                        context: {
                            // Data passed to context is available
                            // in page queries as GraphQL variables.
                            slug: node.frontmatter.slug,
                        },
                    })
                })

                // 1. Create tags (goal) pages
                let goals = []

                _.each(items, (edge) => {
                    if (_.get(edge, `node.frontmatter.goals`)) {
                        goals = goals.concat(edge.node.frontmatter.goals.map(goal => goal.id))
                    }
                })

                // Eliminate duplicate tags
                goals = _.uniq(goals)

                // Make tag pages
                goals.forEach((goal) => {
                    createPage({
                        path: `/objectif/${_.kebabCase(goal)}/`,
                        component: goalTemplate,
                        context: {
                            goal,
                        },
                    })
                })

                // 2. Create category pages
                const categs = result.data.categories.edges
                let categories = []

                _.each(categs, (edge) => {
                    if (_.get(edge, `node.slug`)) {
                        categories = categories.concat(edge.node.slug)
                    }
                })

                // Eliminate duplicate categories (contains slugs)
                categories = _.uniq(categories)

                // Make category pages
                categories.forEach((category) => {
                    createPage({
                        path: `/${_.kebabCase(category)}/`,
                        component: categoryTemplate,
                        context: { //slug
                            category,
                        },
                    })
                })

                // Pagination for posts, e.g., /, /page/2, /page/3
                paginate({
                    createPage,
                    items: items,
                    itemsPerPage: config.postsPerPage,
                    component: indexTemplate,
                    pathPrefix: ({ pageNumber }) => {
                        if (pageNumber === 0) {
                            return `/`
                        } else {
                            return `/page`
                        }
                    },
                })

                return resolve()
            })
        )
    })

    /**
    * Authors
    */
    const createAuthors = new Promise((resolve, reject) => {
        const authorTemplate = path.resolve(`./src/templates/author.js`)
        resolve(
            graphql(`
              query allAuthors {
                allMarkdownRemark(
                  filter: {fileAbsolutePath: {regex: "/authors/"}},
                  sort: {order: ASC, fields: frontmatter___author_id},
                ) {
                  totalCount
                  edges {
                    node {
                      frontmatter {
                        slug
                        author_id
                      }
                    }
                  }
                }
              }`
            ).then((result) => {
                if (result.errors) {
                    return reject(result.errors)
                }

                if (!result.data.allMarkdownRemark) {
                    return resolve()
                }

                const items = result.data.allMarkdownRemark.edges
                const postsPerPage = config.postsPerPage

                _.forEach(items, ({ node }) => {
                    const totalPosts = result.data.allMarkdownRemark.totalCount !== null ? result.data.allMarkdownRemark.totalCount : 0
                    const numberOfPages = Math.ceil(totalPosts / postsPerPage)

                    // This part here defines, that our author pages will use
                    // a `/author/:slug/` permalink.
                    node.url = `/author/${node.frontmatter.slug}/`

                    Array.from({ length: numberOfPages }).forEach((_, i) => {
                        const currentPage = i + 1
                        const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
                        const nextPageNumber = currentPage + 1 > numberOfPages ? null : currentPage + 1
                        const previousPagePath = prevPageNumber ? prevPageNumber === 1 ? node.url : `${node.url}page/${prevPageNumber}/` : null
                        const nextPagePath = nextPageNumber ? `${node.url}page/${nextPageNumber}/` : null

                        createPage({
                            path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
                            component: path.resolve(authorTemplate),
                            context: {
                                // Data passed to context is available
                                // in page queries as GraphQL variables.
                                slug: node.frontmatter.slug,
                                author: node.frontmatter.author_id,
                                limit: postsPerPage,
                                skip: i * postsPerPage,
                                numberOfPages: numberOfPages,
                                humanPageNumber: currentPage,
                                prevPageNumber: prevPageNumber,
                                nextPageNumber: nextPageNumber,
                                previousPagePath: previousPagePath,
                                nextPagePath: nextPagePath,
                            },
                        })
                    })
                })
                return resolve()
            })
        )
    })

    return Promise.all([createPosts, createAuthors])
}
