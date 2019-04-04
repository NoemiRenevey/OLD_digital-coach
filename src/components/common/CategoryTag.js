import React from 'react'
import { Link } from 'gatsby'

import { FaFlask } from "react-icons/fa"

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../../styles/constants'

const CategoryTag = ({category}) => {
    const { slug, short_title: shortTitle } = category

    return (
        <span css={cardCategory}>
            <Link to={`/${slug}`}><FaFlask />  {shortTitle}</Link>
        </span>
    )
}

export default CategoryTag

const cardCategory = css`
    display: block;
    position: relative;
    z-index: 4;
    margin-top: -20px;

    a {
        color: ${colors.accent3};
        background-color: white;
        display: inline-block;
        padding: 2px 10px;
        border-radius: 5px;

        :hover {
            text-decoration: none;
            color: ${colors.accent};
            transition: color .2s linear;
        }
    }
`
