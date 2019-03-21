import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import { MdTimelapse } from "react-icons/md"
import { FaGrinBeamSweat } from "react-icons/fa";

import { Layout } from '../components/common'
// import { MetaData } from '../components/common/meta'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../styles/constants'
import ToolsList from '../components/common/ToolsList'

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
    const readingTime = postNode.timeToRead

    return (
        <Fragment>
            {/*<MetaData
                data={data}
                location={location}
                type="article"
            />*/}
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
                            <div css={contentBoilerplate}>
                                <div css={boilerplateLeft}>
                                    <ToolsList tools={tools} />
                                </div>
                                <div css={boilerplateRight}>
                                    <div><MdTimelapse /> {readingTime} min</div>
                                    <div><FaGrinBeamSweat /> Difficulté {complexity}/3</div>
                                </div>
                            </div>

                            <div css={sidebarSection} >
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
                                    fixed(width: 50, height: 50) {
                                        ...GatsbyImageSharpFixed_withWebp
                                    }
                                }
                            }
                        }
                        goals {
                            id
                            name
                        }
                    }
                    timeToRead
                    html
                }
            }
        }
    }
`

/**
 * 
 * CSS
 * 
 */

// content

// post-feature-image

// post-full-content

// content-title

// content-body

const sidebarSection = css`
    position: fixed;
    left: 20px;
    top: 40vh;
    width: 200px;
    background-color: ${colors.lightgrey};
    border-radius: 10px;
    padding: 20px;
`

const contentBoilerplate = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 6px 0;
    color: ${colors.accent};
`

const boilerplateLeft = css`
    display: flex;
    align-items: center;
`

const boilerplateRight = css`
    display: flex;
    // flex-direction: column;
    color: ${colors.midgrey};

    div {
        margin-left: 20px;
    }
`