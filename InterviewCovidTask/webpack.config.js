import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve('dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
   
   
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        options: {
            plugins: ['@babel/plugin-syntax-dynamic-import'], 
          },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
};

export default () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
