import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
// import { MetaData } from '../components/common/meta'
// import { postFields } from '../utils/fragments'

import EventCard from '../components/common/EventCard'

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
    const posts = data.articles.edges
    const events = data.events.edges

    return (
        <Fragment>
            {/*<MetaData location={location} />*/}
            <Layout isHome={true}>
                <div className="container" css={homePage}>
                    <section css={productPitch}>
                        <div css={leftProductPitch}>
                            <h3>En Bref!</h3>
                            <h2>Développez votre business grâce à internet... en toute autonomie</h2>
                            <p className="big">Mettez en place nos "recettes digitales", elles décrivent précisément quoi faire pour atteindre un objectif donné. Il n'y a plus qu'à suivre la méthode : vous (ou votre équipe) devenez indépendant.</p>
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
                            <div css={imagePitch}>
                                <img src="https://place-hold.it/300x300" alt="placeholder"/>
                            </div>
                        </div>
                    </section>

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

                    <section css={eventsSection}>
                        <div css={eventsIntro}>
                            <h2>Rendez-Vous! Checkpoints Activation</h2>
                            <p className="big">Besoin d'un coup de boost, de poser des questions, et de partager vos expériences d'activation digitale avec le reste de la communauté ? Rejoignez-nous lors des événements ou des Webinars/LIVE.</p>
                        </div>
                        <div css={eventsFeed}>
                            {events.map(({ node }) => (
                                // Include the markup for each event - components/common/EventCard.js
                                <EventCard key={node.slug} event={node} />
                            ))}
                        </div>
                    </section>
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

const productPitch = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`

const leftProductPitch = css`
    flex-grow: 2;
    flex-basis: 0;
    max-width: 600px;
`

const perfectSolution = css`

`

const rightProductPitch = css`
    flex-basis: 0;
    flex-grow: 1;
`

const imagePitch = css`
    text-align: right;
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

// Events

const eventsSection = css`
    margin-top: 50px;
`

const eventsIntro = css`
    text-align: left;
`

const eventsFeed = css`
    display: flex;
    justify-content: flex-start;
    margin: 10px -20px;
`

/**
 * 
 * Query
 * 
 */

export const pageQuery = graphql`
    query IndexQuery {
        articles: allMarkdownRemark(filter: {
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
        events: allEventsYaml {
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
