import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.allMarkdownRemark.edges[0].node

    return (
        <Fragment>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Layout>
                <div className="container">
                    <article className="content">
                        { post.frontmatter.featured_image ?
                            <figure className="post-feature-image">
                                <img src={ post.frontmatter.featured_image.childImageSharp.fixed.src } alt={ post.frontmatter.title } />
                            </figure> : null }
                        <section className="post-full-content">
                            <h1 className="content-title">{post.frontmatter.title}</h1>

                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        </section>
                    </article>
                </div>
            </Layout>
        </Fragment>
    )
}

// Post.propTypes = {
//     data: PropTypes.shape({
//         ghostPost: PropTypes.shape({
//             title: PropTypes.string.isRequired,
//             html: PropTypes.string.isRequired,
//             feature_image: PropTypes.string,
//         }).isRequired,
//     }).isRequired,
//     location: PropTypes.object.isRequired,
// }

export default Post

export const postQuery = graphql`
    query singleMarkdownArticle($slug: String!) {
        allMarkdownRemark(filter: {frontmatter: {slug: {eq: $slug}}, fileAbsolutePath: {regex: "\/articles/"}}) {
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
                    }
                    html
                }
            }
        }
    }
`
