import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'gatsby'
const _ = require(`lodash`)
// import { Tags } from '@tryghost/helpers-gatsby'
// import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const PostCard = ({ post }) => {
    const url = `/${post.frontmatter.slug}/`
    const tools = post.frontmatter.tools
    const goals = post.frontmatter.goals
    // const author = post.frontmatter.author ? post.frontmatter.author.frontmatter.author_id : `Lyketil` 
    // const authorSlug = post.frontmatter.author ? post.frontmatter.author.frontmatter.slug : null

    return (
        <Link to={url} className="post-card">
            <header className="post-card-header">
                {post.frontmatter.featured_image &&
                    <div className="post-card-image" style={{
                        backgroundImage: `url(${post.frontmatter.featured_image.childImageSharp.fixed.src})` ,
                    }}></div>
                }
                {goals &&
                    <div className="post-card-tags">
                        {goals.map((goal, i) => [
                            i > 0 && `, `,
                            <Link to={`/objectif/${_.kebabCase(goal.id)}/`} key={i}>{goal.name}</Link>
                        ])}
                    </div>
                }
                {post.frontmatter.category &&
                    <span><Link to={`/${post.frontmatter.category.slug}`}>{post.frontmatter.category.short_title}</Link></span>
                }
                <h2 className="post-card-title">{post.frontmatter.title}</h2>
            </header>
            <section className="post-card-excerpt">{post.frontmatter.desc}</section>
            <footer className="post-card-footer">
                {tools && 
                <div className="post-card-footer-left">
                    {tools.map((tool, i) => {
                        return (
                            <Fragment key={i}>
                                <div className="post-card-avatar">
                                    <img className="author-profile-image" src={tool.logo.childImageSharp.fixed.src} alt={tool.name} />
                                </div>
                                <span><Link to={`/outils/${tool.id}`}>{tool.name}</Link></span>
                            </Fragment>
                        )
                    })}
                </div>
                }
                <div className="post-card-footer-right">
                    <div>{post.timeToRead} min</div>
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
