const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/, // Esta regra se aplica a arquivos .js
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Usa o babel-loader para transpilar código JS
        },
      },
      {
        test: /\.css$/, // Esta regra se aplica a arquivos .css
        use: ['style-loader', 'css-loader'], // Usa style-loader e css-loader para lidar com arquivos CSS
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Esta regra se aplica a arquivos de imagem
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Limite para carregar imagens como URLs (opcional)
              name: 'images/[name].[ext]', // Nome e local de saída dos arquivos de imagem (opcional)
            },
          },
        ],
      },
    ],
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "fs": require.resolve("fs")
    },
  },
};
