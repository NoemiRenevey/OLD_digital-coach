import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
// import { MetaData } from '../components/common/meta'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location, pageContext }) => {
    // const posts = data.allGhostPost.edges
    const posts = data.allMarkdownRemark.edges

    return (
        <Fragment>
            {/*<MetaData location={location} />*/}
            <Layout isHome={true}>
                <div className="container">
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </Fragment>
    )
}

// Index.propTypes = {
//     data: PropTypes.shape({
//         allGhostPost: PropTypes.object.isRequired,
//     }).isRequired,
//     location: PropTypes.shape({
//         pathname: PropTypes.string.isRequired,
//     }).isRequired,
// }

export default Index

export const pageQuery = graphql`
    query MarkdownArticlesQuery {
        allMarkdownRemark(filter: {
            fileAbsolutePath: {regex : "\/articles/"}
        }) {
            edges {
                node {
                    frontmatter {
                        slug
                        date
                        title
                        desc
                        featured_image {
                            childImageSharp {
                              fixed(width: 300) {
                                src
                              }
                            }
                        }
                        goals {
                            id
                            name
                        }
                        author {
                            frontmatter {
                              author_id
                              slug
                              avatar {
                                childImageSharp {
                                  fixed(width: 100) {
                                    src
                                  }
                                }
                              }
                            }
                        }
                        category {
                            id
                            slug
                            short_title
                            title
                            intro
                        }
                        complexity
                        tools {
                            id
                            name
                            logo {
                                childImageSharp {
                                    fixed(width: 50, height: 50) {
                                        ...GatsbyImageSharpFixed_withWebp
                                    }
                                }
                            }
                        }
                    }
                    timeToRead
                }
            }
        }
    }
`

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
// export const pageQuery = graphql`
//   query GhostPostQuery($limit: Int!, $skip: Int!) {
//     allGhostPost(
//         sort: { order: DESC, fields: [published_at] },
//         limit: $limit,
//         skip: $skip,
//         filter: { slug: {ne: "data-schema"}}
//     ) {
//       edges {
//         node {
//           ...GhostPostFields
//         }
//       }
//     }
//   }
// `
