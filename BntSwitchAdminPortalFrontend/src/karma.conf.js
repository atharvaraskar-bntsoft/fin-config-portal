// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-sonarqube-unit-reporter'),
    ],
    files: [
      'node_modules/jquery/dist/jquery.js',
      { pattern: 'node_modules/jquery/dist/jquery.js', included: false, watched: false },
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: '../reports/ut_report.xml',
      overrideTestDescription: true,
      testPaths: ['./src'],
      testFilePattern: '.spec.ts',
      useBrowserName: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    reporters: ['progress', 'kjhtml', 'sonarqubeUnit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    captureTimeout: 100000, // it was already there
    browserDisconnectTimeout : 100000,
    browserDisconnectTolerance : 1,
    // browserNoActivityTimeout : 60000,//by default 10000
    browserNoActivityTimeout: 100000
  });
};
