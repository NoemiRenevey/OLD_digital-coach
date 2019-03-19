import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
const _ = require(`lodash`)

import { MdTimelapse } from "react-icons/md"
import { FaCheck } from "react-icons/fa"

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

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
                    }}></div>
                }
                <div css={cardWrapper}>
                    {category &&
                        <span css={cardCategory}><Link to={`/${category.slug}`}>{category.short_title}</Link></span>
                    }
                    <h2 css={cardTitle}>{title}</h2>
                </div>
            </header>

            <div css={cardWrapper}>
                <section css={cardExcerpt}>{excerpt}</section>

                {goals &&
                    <div css={cardGoals}>
                        {goals.map((goal, i) => [
                            i > 0 && `, `,
                            <Link to={`/objectif/${_.kebabCase(goal.id)}/`} key={i}><FaCheck /> {goal.name}</Link>
                        ])}
                    </div>
                }
                <footer css={cardFooter}>
                    {tools && 
                    <div css={cardFooterLeft}>
                        {tools.map((tool, i) => {
                            return (
                                <div css={toolList} key={i}>
                                    <div css={itemTooltip} className="name-tooltip">
                                        {tool.name}
                                    </div>

                                    {tool.logo && 
                                        <Link to={`/outils-digitaux/${tool.id}`}>                                               
                                            <Img 
                                                alt={tool.name}
                                                fixed={tool.logo.childImageSharp.fixed}
                                            />
                                        </Link>
                                    }
                                </div>
                            )
                        })}
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
    margin: 0;
    width: auto;
    height: 200px;
    border-radius: 5px 5px 0 0;
    background: ${colors.lightgrey} no-repeat center center;
    background-size: cover;
`

const cardCategory = css`
    display: block;    
    margin: 5px 0 2px;

    a {
        color: ${colors.midgrey};

        :hover {
            text-decoration: none;
            color: ${colors.accent};
            transition: color .2s linear;
        }
    }
`

const cardTitle = css`
    margin: 0 0 10px 0;
    padding: 0;
`

const cardExcerpt = css`
    font-size: 1.6rem;
    line-height: 1.55em;
`

const cardGoals = css`
    margin: 20px 0 20px;
    font-size: 1.4rem;
    line-height: 1.15em;
    color: white;

    a {
        background-color: ${colors.whitegrey}; 
        color: ${colors.midgrey};
        padding: 4px 8px;
        border-radius: 5px;

        svg {
            margin-bottom: 2px;
        }

        :hover {
            text-decoration: none;
            color: ${colors.accent};
            transition: color .2s linear;
        }
    }
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

const toolList = css`
    position: relative;
    flex-shrink: 0;
    margin: 0 0 0 -14px;
    padding: 0;

    :nth-of-type(1) {
        z-index: 1;
        margin: 0;
    }
    :nth-of-type(2) {
        z-index: 2;
    }
    :nth-of-type(3) {
        z-index: 3;
    }
    :nth-of-type(4) {
        z-index: 4;
    }
    :nth-of-type(5) {
        z-index: 5;
    }
    :nth-of-type(6) {
        z-index: 6;
    }
    :nth-of-type(7) {
        z-index: 7;
    }
    :nth-of-type(8) {
        z-index: 8;
    }
    :nth-of-type(9) {
        z-index: 9;
    }
    :nth-of-type(10) {
        z-index: 10;
    }

    :hover .name-tooltip {
        opacity: 1;
        transform: translateY(0px);
    }

    img {
        border-radius: 100%;
        border: 2px solid white;
        box-shadow: rgba(39, 44, 49, .1) 0 2px 3px;
        width: 96% !important;
        height: 96% !important;
    }
`

const itemTooltip = css`
    position: absolute;
    bottom: 105%;
    z-index: 999;
    display: block;
    padding: 6px 12px;
    color: white;
    font-size: 1.2rem;
    letter-spacing: 0.2px;
    white-space: nowrap;
    background: ${colors.darkgrey};
    border-radius: 3px;
    box-shadow: rgba(39, 44, 49, 0.03) 0px 3px 8px;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    transform: translateY(6px);
    pointer-events: none;

    @media (max-width: 650px) {
        display: none;
    }
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