import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Author page (/author/:slug)
*
* Loads all posts for the requested author incl. pagination.
*
* Issue about filtering mapped fields in graphql 
* @link https://github.com/gatsbyjs/gatsby/issues/4614
*
*/
const Author = ({ data, location, pageContext }) => {
    // console.log(data.singleAuthor)
    const author = data.singleAuthor.edges["0"].node.frontmatter
    const twitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = author.facebook ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}` : null
    const profileImage = author.avatar !== null ? author.avatar.childImageSharp.fixed.src : 'https://via.placeholder.com/150'

    console.log(data.posts)
    const posts = data.posts.edges

    return (
        <Fragment>
            <MetaData
                data={data}
                location={location}
                type="profile"
            />
            <Layout>
                <div className="container">
                    <header className="author-header">
                        <div className="author-header-content">
                            <h1>{author.author_id}</h1>
                            {author.bio && <p>{author.bio}</p>}
                            <div className="author-header-meta">
                                {author.website && <a className="author-header-item" href={author.website} target="_blank" rel="noopener noreferrer">Website</a>}
                                {twitterUrl && <a className="author-header-item" href={twitterUrl} target="_blank" rel="noopener noreferrer">Twitter</a>}
                                {facebookUrl && <a className="author-header-item" href={facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>}
                            </div>
                        </div>
                        <div className="author-header-image">
                            {profileImage && <img src={profileImage} alt={author.author_id} />}
                        </div>
                    </header>
                    <section className="post-feed">
                        {posts.map(({ node }) => {
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            console.log("node.frontmatter.author", node.frontmatter.author.frontmatter.author_id)
                            console.log("author.author_id", author.author_id)
                            if (node.frontmatter.author) {
                                if (node.frontmatter.author.frontmatter.author_id === author.author_id) {
                                    return (
                                        <PostCard key={node.id} post={node} />
                                    )
                                }
                            }
                            return null
                        })}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </Fragment>
    )
}

// Author.propTypes = {
//     data: PropTypes.shape({
//         ghostAuthor: PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             cover_image: PropTypes.string,
//             profile_image: PropTypes.string,
//             website: PropTypes.string,
//             bio: PropTypes.string,
//             location: PropTypes.string,
//             facebook: PropTypes.string,
//             twitter: PropTypes.string,
//         }),
//         allGhostPost: PropTypes.object.isRequired,
//     }).isRequired,
//     location: PropTypes.shape({
//         pathname: PropTypes.string.isRequired,
//     }).isRequired,
// }

export default Author

export const pageQuery = graphql`
query authorArticlesQuery($slug: String!) {
    singleAuthor: allMarkdownRemark(filter: {frontmatter: {slug: {eq: $slug}}, fileAbsolutePath: {regex: "\/authors/"}}) {
        edges {
            node {
                id
                frontmatter {
                    author_id
                    slug
                    twitter
                    facebook
                    avatar {
                        childImageSharp {
                          fixed(width: 200) {
                            src
                          }
                        }
                    }
                }
                html
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
                author {
                    frontmatter {
                        author_id
                    }
                }
                featured_image {
                    childImageSharp {
                      fixed(width: 300) {
                        src
                      }
                    }
                }
            }
          }
        }
    }
}
`
