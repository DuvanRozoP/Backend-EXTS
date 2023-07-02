const path = require('path');
const { config } = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
config();
const MESSAGE_SERVER = process.env.MESSAGE_SERVER;
const MODE = process.env.MODE;

const CustomMessagePlugin = {
  apply: (compiler) => {
    compiler.hooks.done.tap('CustomMessagePlugin', (stats) => {
      const namespace = stats.compilation.outputOptions.devtoolNamespace;
      const message = `${namespace} La compilación ha finalizado.`;
      console.log('\x1b[1m\x1b[32m%s\x1b[0m', `${MESSAGE_SERVER} ${message}`);
    });
  },
};

module.exports = {
  entry: [
    './modules/server.ts',
    ...(MODE === 'dev' ? ['./modules/dev/messageLog.ts'] : []),
  ],
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
  stats: 'none', // {errorDetails: true,},
  module: {
    rules: [
      {
        test: /\.ts$/, // Aplica las reglas a los archivos TypeScript
        exclude: /node_modules/,
        use: 'swc-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin(), CustomMessagePlugin],
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
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // Directorio base del servidor de desarrollo
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
};
