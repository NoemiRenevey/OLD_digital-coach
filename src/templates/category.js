import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../styles/constants'

/**
* Goal page (/:slug)
*/
const Category = ({ data, location, pageContext }) => {
    const category = data.singleCategory.edges["0"].node
    const posts = data.posts.edges

    return (
        <Fragment>
            <Layout>
                <div className="container">
                    <header className="tag-header">
                        <h1>{category.title}</h1>
                    </header>
                    <p className="content-intro">{category.intro}</p>
                    <section className="post-feed">
                        {posts.map(({ node }) => {
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            if (node.frontmatter.goals) {
                                if (node.frontmatter.category.slug === pageContext.category) {
                                    return (
                                        <PostCard key={node.id} post={node} />
                                    )
                                } else {
                                    return null
                                }
                            } else {
                                return null
                            }
                        })}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </Fragment>
    )
}

// Tag.propTypes = {
//     data: PropTypes.shape({
//         ghostTag: PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             description: PropTypes.string,
//         }),
//         allGhostPost: PropTypes.object.isRequired,
//     }).isRequired,
//     location: PropTypes.shape({
//         pathname: PropTypes.string.isRequired,
//     }).isRequired,
// }

export default Category

export const pageQuery = graphql`
query categoryQuery($category: String) {
    singleCategory: allCategoriesYaml(filter: {slug: {eq: $category}}) {
        edges {
          node {
            id
            slug
            title
            intro
          }
        }
    }
    posts: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/articles/"}}) {
      edges {
        node {
          id
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
            }
            goals {
                id
                name
            }
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