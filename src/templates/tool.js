import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

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
    width: 50%;
`

const toolImg = css`
    width: 30%;
    text-align: right;
    height: 120px;
    width: 120px;
    border-radius: 100%;
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