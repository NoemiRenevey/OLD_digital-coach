import React, { Fragment } from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/common'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { colors } from '../styles/constants'

/**
 * Question Page
 */
const Question = ({ data, location, pageContext }) => {
    const postNode = data.allMarkdownRemark.edges[0].node
    const {
        slug,
        title,
        tldr,
    } = postNode.frontmatter
    const postContent = postNode.html

    return (
        <Fragment>
            <Layout>
                <div className="container">
                    <header>
                        <h1 className="content-title">{title}</h1>
                        <p className="content-intro">{tldr}</p>
                    </header>

                    <section
                        className="content-body load-external-scripts"
                        dangerouslySetInnerHTML={{ __html: postContent }}
                    />
                </div>
            </Layout>
        </Fragment>
    )
}

export default Question

export const postQuery = graphql`
    query singleQuestion($slug: String!) {
        allMarkdownRemark(filter: {frontmatter: {slug: {eq: $slug}}, fileAbsolutePath: {regex: "\/questions/"}}) {
            edges {
                node {
                    frontmatter {
                        slug
                        date
                        title
                        tldr
                    }
                    html
                }
            }
        }
    }
`