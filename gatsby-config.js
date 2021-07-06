/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Knupel`,
    description: `Herr Knupel est ici`,
    author: `@stanlepunk`,
  },

  plugins: [
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
        name: `images_art_hd`,
        path: `${__dirname}/media/images_art_hd`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    // path: `${__dirname}/media/photo/tdm`,
    // IMAGE
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Available options and their defaults:
        base64Width: 20,
        // forceBase64Format: ``, // valid formats: png,jpg,webp // don't work on OSX
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        defaultQuality: 50,
        failOnError: true,
      },
    },
  ],
};
