const path = require(`path`)
const config = require(`./src/utils/siteConfig`)

/**
* This is the place where you can tell Gatsby which plugins to use
* and set them up the way you want.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
*
*/
module.exports = {
    siteMetadata: {
        siteUrl: config.siteUrl,
        siteTitle: config.siteTitleMeta,
        siteDesc: config.siteDescriptionMeta,
        facebookUrl: config.facebookUrl,
        twitterUrl: config.twitterUrl,
        navigation: config.navigation,
    },
    plugins: [
        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        // Setup for optimised images.
        // See https://www.gatsbyjs.org/packages/gatsby-image/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`,
            },
        },
        // Setup for markdown posts
        // See https://www.gatsbyjs.org/docs/adding-markdown-pages/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `articles`),
                name: `articles`,
            },
        },
        // Setup for markdown "Questions"
        // See https://www.gatsbyjs.org/docs/adding-markdown-pages/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `questions`),
                name: `questions`,
            },
        },
        // Setup for authors
        // See https://www.gatsbyjs.org/docs/gatsby-config/#mapping-node-types
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `authors`),
                name: `authors`,
            },
        },
        // Setup for YAML content
        // See https://www.gatsbyjs.org/packages/gatsby-transformer-yaml/
        `gatsby-transformer-yaml`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/articles/categories/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/articles/goals/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/digital_tools/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/events/`,
            },
        },
        // Transform markdown to HTML
        // add reading time https://www.gatsbyjs.org/packages/gatsby-remark-reading-time/
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-reading-time`,
                    `gatsby-remark-responsive-iframe`,
                    {   // https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            // offsetY: `130`,
                            icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
                            className: `svg-anchor`,
                            maintainCase: false,
                            removeAccents: true,
                        },
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: `language-`,
                            inlineCodeMarker: null,
                            aliases: {},
                            showLineNumbers: false,
                            noInlineHighlight: false,
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        // Use SASS with node-sass https://github.com/sass/node-sass
        // https://www.gatsbyjs.org/packages/gatsby-plugin-sass/
        `gatsby-plugin-sass`,
        /**
         *  Utility Plugins
         */
        `gatsby-plugin-advanced-sitemap`,
        // {
        //     resolve: `gatsby-plugin-advanced-sitemap`,
        //     options: {
        //         query: `
        //         {
        //             allMarkdownRemark(filter: { fileAbsolutePath: {regex: "/articles/"} }) {
        //                 edges {
        //                     node {
        //                         id
        //                         frontmatter {
        //                             slug
        //                             date
        //                             title
        //                             desc
        //                         }
        //                     }
        //                 }
        //             }            
        //         }`,
        //         mapping: {
        //             articles: {
        //                 sitemap: `posts`,
        //             },
        //         },
        //         exclude: [
        //             `/dev-404-page`,
        //             `/404`,
        //             `/404.html`,
        //             `/offline-plugin-app-shell-fallback`,
        //         ],
        //         createLinkInHead: true,
        //     },
        // },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        // `gatsby-plugin-offline`,
    ],
    mapping: {
        'MarkdownRemark.frontmatter.author': `MarkdownRemark.frontmatter.author_id`,
        'MarkdownRemark.frontmatter.category': `CategoriesYaml`,
        'MarkdownRemark.frontmatter.tools': `ToolsYaml`,
        'MarkdownRemark.frontmatter.tool': `ToolsYaml`,
        'MarkdownRemark.frontmatter.goals': `GoalsYaml`,
    },
}