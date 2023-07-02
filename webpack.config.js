const path = require('path');
const { config } = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
config();
const PORT = process.env.PORT;
const MESSAGE_SERVER = process.env.MESSAGE_SERVER;
const MODE = process.env.MODE;

module.exports = {
  entry: './src/server.ts', // Ruta de entrada de tu archivo principal del servidor
  target: 'node', // Indica que la salida será para el entorno de Node.js
  mode: MODE === 'dev' ? 'development' : 'production',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'), // Ruta de salida para los archivos compilados
    filename: 'server.js', // Nombre del archivo de salida
  },
  resolve: {
    extensions: ['.ts', '.js'], // Extensiones de archivos que se pueden importar
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@controller': path.resolve(__dirname, 'src/controller/'),
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@models': path.resolve(__dirname, 'src/models/'),
      '@network': path.resolve(__dirname, 'src/network/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@cache': path.resolve(__dirname, 'src/cache/'),
      '@template': path.resolve(__dirname, 'src/templates'),
    },
  },
  stats: {
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Aplica las reglas a los archivos TypeScript
        exclude: /node_modules/,
        use: 'ts-loader', // Utiliza ts-loader para compilar los archivos TypeScript
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // Eliminar código inalcanzable
            dead_code: true,
            // Eliminar expresiones de depuración
            drop_debugger: true,
            // Eliminar funciones de depuración
            drop_console: true,
          },
          keep_fnames: MODE === 'dev' ? true : false,
        },
      }),
    ],
  },
};
