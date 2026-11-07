import postcss from 'postcss';
import postcssConfig from './postcss.config.js';

export default async function (eleventyConfig) {
  // Pass through assets
  eleventyConfig.addPassthroughCopy({ 'site/_assets': '/_assets' });
  eleventyConfig.addPassthroughCopy({ 'site/_js': '/_js' });
  eleventyConfig.addPassthroughCopy({ _redirects: '/_redirects' });

  // Transform CSS files using PostCSS
  eleventyConfig.addTemplateFormats('css');

  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (inputContent, inputPath) => {
      if (!inputPath.endsWith('.css')) return;

      return async () => {
        const result = await postcss(postcssConfig.plugins).process(
          inputContent,
          {
            from: inputPath,
            map: process.env.ELEVENTY_RUN_MODE !== 'build' && {
              inline: true,
            },
          },
        );
        return result.css;
      };
    },
  });
}

export const config = {
  dir: {
    input: 'site',
    output: 'dist',
  },
};
