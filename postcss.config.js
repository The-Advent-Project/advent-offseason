import postcssPresetEnv from 'postcss-preset-env';

const postcssConfig = {
  plugins: [
    postcssPresetEnv({
      stage: 2, // Adjust stage based on the features you want
      features: {
        // Below stage 2, so enable them explicitly
        'custom-selectors': true,
        'custom-media-queries': true,
        'nesting-rules': true,
      },
    }),
  ],
};

export default postcssConfig;
