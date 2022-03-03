const path = require('path');

module.exports = env => {

  let config = {
    entry: {
      background: path.join(__dirname, 'src/background.js'),
      content: path.join(__dirname, 'src/content.js'),
      popup: path.join(__dirname, 'src/popup.js')
    },

    output: {
      path: path.join(__dirname, `${env.bro}/js`), // env.bro == firefox || chrome
      filename: '[name].js'
    },

    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|jsx)$/,
          use: [
            'babel-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader',
            {
              loader: 'style-resources-loader',
              options: {
                patterns: [
                  path.resolve(__dirname, 'src/styles/var.less')
                ]
              }
            }
          ]
        },
        {
          test: /\.(gif|png|jpeg|jpg|svg)$/i,
          use: [
            'url-loader'
          ]
        }
      ]
    },
    // alias
    resolve: {
      extensions: ['.js', '.jsx', '.less', '.css'],
      alias: {
        '~': path.resolve(__dirname),
        Views: path.resolve(__dirname, 'src/views/'),
        Styles: path.resolve(__dirname, 'src/styles/'),
        Components: path.resolve(__dirname, 'src/components/'),
        Images: path.resolve(__dirname, 'src/images/'),
        Utils: path.resolve(__dirname, 'src/utils/'),
        Contexts: path.resolve(__dirname, 'src/contexts/')
      }
    }
  };

  // avec --env.type=dev
  if (env.type === 'dev') {
    config.mode = 'development';
    config.devtool = 'source-map';
  // avec --env.type=prod
  } else if (env.type === 'prod') {
    config.mode = 'production';
  }

  return config;

};
