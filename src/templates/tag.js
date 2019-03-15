import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Tag page (/tag/:slug)
*
* Loads all posts for the requested tag incl. pagination.
*
*/
const Tag = ({ data, location, pageContext }) => {
    const tag = pageContext.tag
    const posts = data.allMarkdownRemark.edges

    return (
        <Fragment>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout>
                <div className="container">
                    <header className="tag-header">
                        <h1>{tag}</h1>
                    </header>
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

export default Tag

export const pageQuery = graphql`
query tagQuery($tag: String) {
    allMarkdownRemark(filter: {frontmatter: {tags: {in: [$tag]}}}) {
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
            author {
                frontmatter {
                    author_id
                    slug
                }
            }
            tags
          }
        }
      }
    }
  }
`
