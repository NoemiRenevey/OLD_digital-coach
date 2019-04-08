import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'gatsby'
const _ = require(`lodash`)

import { MdTimelapse } from "react-icons/md"
import { FaCheck } from "react-icons/fa"

import ToolsList from "./ToolsList"

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'
import CategoryTag from './CategoryTag'
import GoalsTags from './GoalsTags'

const PostCard = ({ post }) => {
    const url = `/${post.frontmatter.slug}/`
    const tools = post.frontmatter.tools
    const goals = post.frontmatter.goals
    const featuredImg = post.frontmatter.featured_image
    const category = post.frontmatter.category
    const title = post.frontmatter.title
    const excerpt = post.frontmatter.desc
    // const author = post.frontmatter.author ? post.frontmatter.author.frontmatter.author_id : `Lyketil` 
    // const authorSlug = post.frontmatter.author ? post.frontmatter.author.frontmatter.slug : null

    return (
        <Link to={url} css={postCard}>
            <header css={cardHeader}>
                {featuredImg &&
                    <div css={cardImage} style={{
                        backgroundImage: `url(${featuredImg.childImageSharp.fixed.src})` ,
                    }}>
                        {goals &&
                            <GoalsTags goals={goals} />
                        }
                    </div>
                }
                <div css={cardWrapper}>
                    {category &&
                        <CategoryTag category={category} />
                    }
                    <h2 css={cardTitle}>{title}</h2>
                </div>
            </header>

            <div css={cardWrapper}>
                <section css={cardExcerpt}>{excerpt}</section>

                <footer css={cardFooter}>
                    {tools && 
                        <div css={cardFooterLeft}>
                            <ToolsList tools={tools} />
                        </div>
                    }
                    <div css={cardFooterRight}>
                        <div><MdTimelapse /> {post.timeToRead} min</div>
                    </div>
                </footer>
            </div>
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

/**
 * 
 * CSS
 * 
 */

const postCard = css`
    border: 1px solid ${colors.whitegrey};
    border-radius: 5px;
    color: inherit;
    background-color: white;
    text-decoration: none;
    box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
    transition: all 0.5s ease;

    :hover {
        text-decoration: none;
        box-shadow: rgba(39, 44, 49, 0.2) 1px 6px 12px;
        transition: all 0.4s ease;
    }
`

const cardWrapper = css`
    padding: 0 10px; 
`

const cardHeader = css`
`

const cardImage = css`
    position: relative;
    margin: 0;
    width: auto;
    height: 200px;
    border-radius: 5px 5px 0 0;
    background: ${colors.lightgrey} no-repeat center center;
    background-size: cover;
`

const cardTitle = css`
    margin: 0 0 10px 0;
    text-align: left;
    font-size: 2rem;
    padding: 0;
`

const cardExcerpt = css`
    font-size: 1.6rem;
    line-height: 1.55em;
`

const cardFooter = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 6px 0;
    color: ${colors.accent};
`

const cardFooterLeft = css`
    display: flex;
    align-items: center;
`

const cardFooterRight = css`
    display: flex;
    flex-direction: column;
    color: ${colors.midgrey};
`

// const cardAvatar = css`
//     width: 30px;
//     height: 30px;
//     margin: 0 7px 0 0;
//     border-radius: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `

// const avatarImg = css`
//     display: block;
//     width: 100%;
//     background: ${colors.accent};
//     border-radius: 100%;
//     object-fit: cover;
// `