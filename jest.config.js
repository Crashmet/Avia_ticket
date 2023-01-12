module.exports = {
  clearMocks: true, // очищать моки(заглущки)
  collectCoverageFrom: ['src/**/*.js'], // октуда собирать данные для отчета
  coverageDirectory: 'coverage', // где будет хранится отчет
  moduleFileExtensions: ['js'], // рачширение файла для теста
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'], // где хранятся наши данные
  testPathIgnorePatterns: ['\\\\node_modules\\\\'], // игнор файлов
  transformIgnorePatterns: ['<rootDir>/node_modules/'], // игнор
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest', // доп тесты для других расширений
  }, //файлы не использующиеся в тестах
  // verbose: false,
};
