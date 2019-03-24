import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
const _ = require(`lodash`)

import { MdTimelapse } from "react-icons/md"
import { FaGrinBeamSweat } from "react-icons/fa";

import { Layout } from '../components/common'
// import { MetaData } from '../components/common/meta'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../styles/constants'
import ToolsList from '../components/common/ToolsList'
import CategoryTag from '../components/common/CategoryTag'
import GoalsTags from '../components/common/GoalsTags'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const postNode = data.allMarkdownRemark.edges[0].node
    const {
        slug,
        title,
        featured_image: featuredImage,
        desc,
        author,
        tools,
        goals,
        category,
        complexity,
    } = postNode.frontmatter
    const postContent = postNode.html
    const readingTime = postNode.timeToRead
    const tableOfContents = postNode.tableOfContents

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
                            {category && <CategoryTag category={category} />}
                            <h1 className="content-title">{title}</h1>
                            {goals && <GoalsTags goals={goals} />}
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
                                <div dangerouslySetInnerHTML={{ __html: tableOfContents }} css={tableOfCont}/>
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
                    tableOfContents(
                        pathToSlugField: "frontmatter.slug"
                        maxDepth: 2
                    )
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
    padding: 20px 20px 15px;
    border: 1px solid ${colors.whitegrey};
    border-radius: 5px;
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

const metaGoals = css`
`

const tableOfCont = css`
`