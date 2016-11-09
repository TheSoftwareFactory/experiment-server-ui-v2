module.exports = {
  entry: ['babel-polyfill','./src/index.jsx'],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  watch: true,
  debug : true,
  cache: true,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0']
        }
      }
  ]
},
devServer: {
  contentBase: './dist',
  hot: true
}
};
