import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const postNode = data.allMarkdownRemark.edges[0].node
    const {
        title,
        featured_image: featuredImage,
        desc,
        headings,
        author,
        tools,
        goals,
        category,
        complexity,
    } = postNode.frontmatter
    const postContent = postNode.html

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
                        {featuredImage ?
                            <figure className="post-feature-image">
                                <img src={ featuredImage.childImageSharp.fixed.src } alt={ title } />
                            </figure> : null }
                        <section className="post-full-content">
                            <h1 className="content-title">{title}</h1>
                            <p className="content-intro">{desc}</p>
                            <div>
                                <div><Link to={`/${category.slug}`}>{category.short_title}</Link></div>
                                <div>Difficulté {complexity}/3</div>
                                <div>{goals.map(goal => (<span key={goal.id}>{goal.name}</span>))}</div>
                            </div>

                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: postContent }}
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
                    headings {
                        depth
                        value
                    }
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
                        category {
                            id
                            slug
                            short_title
                            intro
                          }
                        complexity
                        tools {
                            id
                            name
                            logo {
                                childImageSharp {
                                    fixed {
                                        src
                                    }
                                }
                            }
                        }
                        goals {
                            id
                            name
                        }
                    }
                    html
                }
            }
        }
    }
`

// content

// post-feature-image

// post-full-content

// content-title

// content-body