import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'gatsby'
// import { Tags } from '@tryghost/helpers-gatsby'
// import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const author = post.frontmatter.author.frontmatter.author_id ? post.frontmatter.author.frontmatter.author_id : "Lyketil" 
    // const readingTime = readingTimeHelper(post)

    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.frontmatter.featured_image &&
                    <div className="post-card-image" style={{
                        backgroundImage: `url(${post.frontmatter.featured_image.childImageSharp.fixed.src})` ,
                    }}></div>}
                <div className="post-card-tags">Tag 1, Tag 2</div>
                <span>1. Webmarketing</span>
                <h2 className="post-card-title">{post.frontmatter.title}</h2>
            </header>
            <section className="post-card-excerpt">{post.frontmatter.desc}</section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    <div className="post-card-avatar">
                        <img className="author-profile-image" src="https://via.placeholder.com/300" alt=""/>
                    </div>
                    {author && <span>{author}</span>}
                </div>
                <div className="post-card-footer-right">
                    <div>2min</div>
                </div>
            </footer>
        </Link>
    )
}

// PostCard.propTypes = {
//     post: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         feature_image: PropTypes.string,
//         featured: PropTypes.bool,
//         tags: PropTypes.arrayOf(
//             PropTypes.shape({
//                 name: PropTypes.string,
//             })
//         ),
//         excerpt: PropTypes.string.isRequired,
//         primary_author: PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             profile_image: PropTypes.string,
//         }).isRequired,
//     }).isRequired,
// }

export default PostCard
