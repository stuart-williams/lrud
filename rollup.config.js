import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'umd/lrud.js',
    format: 'umd',
    name: 'Lrud'
  },
  plugins: [
    nodeResolve(),
    commonjs()
  ]
}
