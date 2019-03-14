module.exports = {
    siteUrl: `https://gatsby.ghost.org`, // Site domain. Do not include a trailing slash!

    facebookUrl: `https://www.facebook.com/lyketil`,
    twitterUrl: `https://twitter.com/lyketil`,
    instagramUrl: ``,

    navigation: [
        { label: `Help`, url: `/help` },
        { label: `About`, url: `/about` },
        { label: `Digital Lab`, url: `https://lyketil.com` },
    ],

    postsPerPage: 12, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

    siteTitleMeta: `Formation Digitale`, // This allows an alternative site title for meta data for pages.
    siteDescriptionMeta: `Soyez autonome, pas besoin d'agence, suivez nos recettes digitales pas à pas.`, // This allows an alternative site description for meta data for pages.

    shareImage: `/images/Ghost-Docs.jpg`, // fallback image for meta data. Will be used, when no post/tag/author image specified. 1200x1200 is recommended
    shareImageWidth: 1000, // Change to the width of your default share image
    shareImageHeight: 523, // Change to the height of your default share image

    shortTitle: `Ghost`, // Used for App manifest e.g. Mobile Home Screen
    siteIcon: `favicon.png`, // Logo in /static dir used for SEO, RSS, and App manifest
    backgroundColor: `#e9e9e9`, // Used for Offline Manifest
    themeColor: `#15171A`, // Used for Offline Manifest
}
