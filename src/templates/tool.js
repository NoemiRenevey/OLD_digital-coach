import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { MdOpenInNew, MdLanguage, MdFlag, MdMonetizationOn } from "react-icons/md"

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../styles/constants'

/**
* Tool Page
*/
const Tool = ({ data, location, pageContext }) => {
    const tool = data.singleTool.edges["0"].node
    const posts = data.posts.edges
    const toolLogo = tool.logo !== null ? tool.logo.childImageSharp.fixed.src : `https://via.placeholder.com/150`
    // console.log(`Page context:`, pageContext)
    // console.log(`Tool:`, tool)

    return (
        <Fragment>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout>
                <div className="container">
                    <header css={toolHeader}>
                        <div css={toolDesc}>                        
                            <h1>{tool.name}</h1>
                            <p className="content-intro">{tool.desc}</p>

                            <div css={toolMeta}>
                                <ul>
                                    {tool.url && <li><MdOpenInNew /> <a href={tool.url} title={tool.name}>{tool.url.replace(/^https?:\/\//,'')}</a></li>}
                                    {tool.price && <li><MdMonetizationOn /> {tool.price}</li>}
                                    {tool.country && <li><MdFlag /> {tool.country}</li>}
                                    {tool.languages && <li><MdLanguage /> {tool.languages.join(`, `)}</li>}
                                </ul>
                            </div>
                        </div>

                        <div css={toolImg}>
                            {toolLogo && <img src={toolLogo} alt={tool.name} />}
                        </div>
                    </header>

                    <section className="post-feed">
                        {posts.map(({ node }) => {
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            if (node.frontmatter.tools) {
                                if (node.frontmatter.tools.map(tool => tool.id).includes(pageContext.id)) {
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

export default Tool

/**
 * CSS
 */

const toolHeader = css`
    display: flex;
    justify-content: space-between;
`

const toolDesc = css`
    width: 80%;
`

const toolMeta = css`
    background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    border-radius: 5px;
    border: 1px solid ${colors.whitegrey};
    margin-bottom: 30px;
    padding: 20px 20px 10px;

    ul {
        list-style: none;
        padding-left: 0;
        display: flex;
        justify-content: space-between;

        li {
            width: 24%;
            text-align: center;

            svg {
                padding-bottom: 3px;
            }
        }
    }
`

const toolImg = css`
    width: 30%;
    text-align: right;

    img {
        object-fit: cover;
        height: 120px;
        width: 120px;
        border-radius: 100%;
    }
`

export const pageQuery = graphql`
query toolQuery($id: String) {
    singleTool: allToolsYaml(filter: {id: {eq: $id}}) {
        edges {
          node {
            id
            name
            desc
            logo {
                childImageSharp {
                    fixed(width: 200) {
                      src
                    }
                  }
            }
            price
            country
            url
            languages
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