const path = require('path');
const { config } = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const scriptWebpackPlugin = require('./modules/script/scriptWebpackPlugin');
config();
const MODE = process.env.MODE;
module.exports = {
  entry: ['./modules/lib/server.exts.ts'],
  target: 'node',
  mode: MODE === 'dev' ? 'development' : 'production',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.chuck.js',
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
      '@template': path.resolve(__dirname, 'modules/templates/'),
      '@modules': path.resolve(__dirname, 'modules/'),
    },
  },
  stats: 'none', // { errorDetails: true },
  module: {
    rules: [
      {
        test: /\.ts$/, // Aplica las reglas a los archivos TypeScript
        exclude: /node_modules/,
        use: 'swc-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new scriptWebpackPlugin({
      scripts: [
        'ts-node modules/scriptTS/endpoints.ts',
        'ts-node modules/scriptTS/server.ts',
      ],
      catchMessage: 'Error execute Scripts ⛔',
      doneMessage: 'Complete execute Scripts 🟢',
      doneCompilationMessage: 'Bulding Complete 👷‍♀️',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          toplevel: true,
          output: {
            beautify: false, // Deshabilitar formato legible
            semicolons: false, // Eliminar punto y coma al final de las instrucciones
          },
          compress: {
            pure_funcs: ['console.log', 'alert', 'messageLog'],
            reduce_funcs: ['Math.sin', 'Math.cos'],
            dead_code: true,
            drop_debugger: true,
            drop_console: true,
          },
          keep_fnames: MODE === 'dev' ? true : false,
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
