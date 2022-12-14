/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config();


module.exports = {
  siteMetadata: {
    siteUrl: `https://www.knupel.art`,
    title: `Knupel`,
    description: `Herr Knupel est ici`,
    author: `knupel`,
  },

  plugins: [

    // FONT
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        typekit: {
          id: process.env.TYPEKIT_ID,
        },
      },
    },


    // MANIFEST
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Knupel`,
        short_name: `Knupel`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `media/icon.png`,
      },
    },

    // FILE SYSTEME

    // all don't work, may be because is not a same level of researches ?
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `all`,
        path: `${__dirname}/media/visuel`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },


    // MARKDOWN
    // https://dev.to/alexalexyang/how-to-use-markdown-in-pages-in-gatsby-5dee
    // https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/media/markdown`,
        name: `markdown`,
      },
    },
    `gatsby-transformer-remark`,

    // IMAGE
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Available options and their defaults:
        base64Width: 20,
        placeholder: `blurred`,
        breakpoints: [750, 1080, 1366, 1920],
        // forceBase64Format: ``, // valid formats: png,jpg,webp // don't work on OSX
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        defaultQuality: 50,
        failOnError: true,
      },
    },
  ],
};
