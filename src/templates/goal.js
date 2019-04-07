import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Goal page (/objective/:slug)
*/
const Goal = ({ data, location, pageContext }) => {
    const goal = data.singleGoal.edges["0"].node
    const posts = data.posts.edges

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
                        <h1>{goal.name}</h1>
                        <p>{goal.challenge_desc}</p>
                    </header>
                    <p>{goal.solution_desc}</p>
                    <section className="post-feed">
                        {posts.map(({ node }) => {
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            if (node.frontmatter.goals) {
                                if (node.frontmatter.goals.map(goal => goal.id).includes(pageContext.goal)) {
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

export default Goal

export const pageQuery = graphql`
query goalQuery($goal: String) {
    singleGoal: allGoalsYaml(filter: {id: {eq: $goal}}) {
        edges {
          node {
            id
            name
            challenge_desc
            solution_desc
            seller_exp
            buyer_exp
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
