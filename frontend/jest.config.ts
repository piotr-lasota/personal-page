import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: false,
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/src/jest-preprocess.js',
    '^.+\\.[jt]s?$': '<rootDir>/src/jest-preprocess.js'
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js'
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: [],
  globals: {
    __PATH_PREFIX__: ''
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/src/tests-setup-before-framework-installation.js'],
  setupFilesAfterEnv: ['<rootDir>/src/tests-setup-after-env.js']
};

export default config;
