/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.knupel.art`,
    title: `Knupel`,
    description: `Herr Knupel est ici`,
    author: `@stanlepunk`,
  },

  plugins: [
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
    // DATABASE
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: "knupel",
        collection: "generative",
        server: {
          address: "cluster0-shard-00-01.nu5bx.mongodb.net",
          port: 27017,
        },
        auth: {
          user: "stan",
          password: "stan",
        },
        extraParams: {
          replicaSet: "Cluster0-shard-0",
          ssl: true,
          authSource: "admin",
          retryWrites: true,
        },
      },
    },

    // FILE SYSTEME
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `art_hd`,
        path: `${__dirname}/media/visuel/img_art_hd`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `graphic_design_hd`,
        path: `${__dirname}/media/visuel/img_graphic_design_hd`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `photo_hd`,
        path: `${__dirname}/media/visuel/img_photo_hd`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `all_hd`,
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
