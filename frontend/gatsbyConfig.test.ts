import path from 'path';
import * as fs from 'fs';
import gatsbyConfig from './gatsby-config';

const gatsbyPagesFolder = ['src', 'pages'];

describe('Pages config', () => {
  it('contains a matching page source file for every page specified in siteMetadata', async () => {
    // Act
    const missingPages = gatsbyConfig.siteMetadata.pages
      .map((page) => {
        const expectedPageComponentName =
          page.link === '' ? 'index' : page.link;

        const expectedPagePath = path.resolve(
          __dirname,
          ...gatsbyPagesFolder,
          `${expectedPageComponentName}.tsx`
        );

        const fileExists = fs.existsSync(expectedPagePath);

        return fileExists ? null : page.name;
      })
      .filter((missingPageName) => missingPageName !== null);

    // Assert
    expect(missingPages).toBe([]);
  });
});
