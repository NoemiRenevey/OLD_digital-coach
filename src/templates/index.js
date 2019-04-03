import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
// import { MetaData } from '../components/common/meta'
// import { postFields } from '../utils/fragments'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../styles/constants'

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
                    <section css={productPitch}>
                        <div css={leftProductPitch}>
                            <h3>En Bref!</h3>
                            <h2>Développez votre business grâce à internet... en toute autonomie</h2>
                            <p>Mettez en place nos "recettes digitales", elles décrivent précisément quoi faire pour atteindre un objectif donné. Il n'y a plus qu'à suivre la méthode : vous (ou votre équipe) devenez indépendant.</p>
                            <div css={perfectSolution}>
                                <h4>La solution parfaite pour ceux qui...</h4>
                                <ul>
                                    <li>Veulent des solutions concrètes plutôt que de la théorie abstraite</li>
                                    <li>Souhaitent des résultats rapides, sans engager une agence web</li>
                                    <li>Savent que le digital est incontournable pour le futur de leur business</li>
                                </ul>
                            </div>
                        </div>
                        <div css={rightProductPitch}>
                            <img src="https://place-hold.it/300x300" alt="placeholder"/>
                        </div>
                    </section>

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

/**
 * 
 * CSS
 * 
 */
const productPitch = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`

const leftProductPitch = css`
    flex-grow: 2;
    flex-basis: 0;

    h3 {
        margin-top: 0;
    }

    h2 {
        margin-top: .2rem;
        font-size: 3.6rem;
    }

    p {
        font-size: 1.8rem;
        line-height: 2.6rem;
    }
`

const perfectSolution = css`

`

const rightProductPitch = css`
    flex-basis: 0;
    flex-grow: 1;
`

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
