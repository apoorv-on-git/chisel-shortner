module.exports = {
  siteMetadata: {
    title: `shortner`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-transformer-remark",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: `gatsby-chisel`,
      options: {
        path: `${__dirname}/backend`,
      },
    }
  ]
};