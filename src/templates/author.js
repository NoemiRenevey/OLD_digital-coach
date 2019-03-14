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
*/
const Author = ({ data, location, pageContext }) => {
    const author = data.allMarkdownRemark.edges[0].node.frontmatter
    // const posts = data.allGhostPost.edges
    const twitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = author.facebook ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}` : null

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
                            <h1>{author.name}</h1>
                            {author.bio && <p>{author.bio}</p>}
                            <div className="author-header-meta">
                                {author.website && <a className="author-header-item" href={author.website} target="_blank" rel="noopener noreferrer">Website</a>}
                                {twitterUrl && <a className="author-header-item" href={twitterUrl} target="_blank" rel="noopener noreferrer">Twitter</a>}
                                {facebookUrl && <a className="author-header-item" href={facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>}
                            </div>
                        </div>
                        <div className="author-header-image">
                            {author.profile_image && <img src={author.profile_image} alt={author.name} />}
                        </div>
                    </header>
                    {/*
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    */}
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
query authorArticlesQuery($author: String) {
    allMarkdownRemark(filter: {frontmatter: {author: {eq: $author}}, fileAbsolutePath: {regex: "\/articles/"}}) {
        edges {
            node {
                frontmatter {
                title
                slug 
                }
            }
        }
    }
}
`