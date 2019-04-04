import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
// import { MetaData } from '../components/common/meta'
// import { postFields } from '../utils/fragments'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../styles/constants'

import ProductPitch from '../components/sections/ProductPitch'
import EventsFeed from '../components/sections/EventsFeed'
import BenefitsPitch from '../components/sections/BenefitsPitch'
import FunnelOverview from '../components/sections/FunnelOverview'

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
    const posts = data.articles.edges
    const events = data.events.edges

    return (
        <Fragment>
            {/*<MetaData location={location} />*/}
            <Layout isHome={true}>
                <div className="container" css={homePage}>
                    <ProductPitch />

                    <BenefitsPitch />

                    <section css={popularArticles}>
                        <div css={popularIntro}>
                            <h2>Quelques recettes populaires</h2>
                            <p className="big">Suivez nos guides : il suffit d'appliquer nos recettes point par point, afin d'obtenir le résultat souhaité. Une sélection de recettes les plus appréciées ci-dessous.</p>
                        </div>
                        <div className="post-feed">                        
                            {posts.map(({ node }) => (
                                // The tag below includes the markup for each post - components/common/PostCard.js
                                <PostCard key={node.id} post={node} />
                            ))}
                        </div>
                    </section>

                    <FunnelOverview />

                    <EventsFeed events={events} />
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
const homePage = css`
    h3 {
        margin-top: 0;
    }

    h2 {
        margin-top: .2rem;
    }
`

// Popular Articles

const popularArticles = css`
    background-color: ${colors.whitegrey};
    padding: 40px;
    margin: 0 -80px;
    border-radius: 10px;
`

const popularIntro = css`
    text-align: center;
    margin-bottom: 50px;
`

/**
 * 
 * Query
 * 
 */

export const pageQuery = graphql`
    query IndexQuery {
        articles: allMarkdownRemark(
            filter: {
                fileAbsolutePath: {regex: "/articles/"}, 
                frontmatter: {featured: {lte: 3}, draft: {ne: true}}
            },
            sort: {fields: frontmatter___featured},
            limit: 3
        ) {
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
        events: allEventsYaml(limit: 3) {
            edges {
              node {
                slug
                name
                excerpt
                date
                location
                city
                type
                address
                link
                link_cta
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
