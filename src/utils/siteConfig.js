module.exports = {
    siteUrl: `https://gatsby.ghost.org`, // Site domain. Do not include a trailing slash!

    facebookUrl: `https://www.facebook.com/lyketil`,
    twitterUrl: `https://twitter.com/lyketil`,
    instagramUrl: ``,

    navigation: [
        { label: `1 - Webmarketing`, url: `/webmarketing-strategie-digitale` },
        { label: `2 - Contenu`, url: `/creation-de-contenu` },
        { label: `3 - Site Internet`, url: `/optimisation-de-site-web` },
        { label: `4 - Digitalisation d'Entreprise`, url: `/digitalisation-entreprise` },
        { label: `Non, Je veux être accompagné`, url: `https://lyketil.com` },
    ],

    postsPerPage: 12, // Number of posts shown on paginated pages (changes this requires sometimes to delete the cache)

    siteTitleMeta: `Formation Digitale`, // This allows an alternative site title for meta data for pages.
    siteDescriptionMeta: `Soyez autonome dans votre digitalisation, pas besoin d'agence digitale, suivez nos recettes digitales et obtenez des résultats.`, // This allows an alternative site description for meta data for pages.

    shareImage: `/images/Ghost-Docs.jpg`, // fallback image for meta data. Will be used, when no post/tag/author image specified. 1200x1200 is recommended
    shareImageWidth: 1000, // Change to the width of your default share image
    shareImageHeight: 523, // Change to the height of your default share image

    shortTitle: `Ghost`, // Used for App manifest e.g. Mobile Home Screen
    siteIcon: `favicon.png`, // Logo in /static dir used for SEO, RSS, and App manifest
    backgroundColor: `#e9e9e9`, // Used for Offline Manifest
    themeColor: `#15171A`, // Used for Offline Manifest
}
