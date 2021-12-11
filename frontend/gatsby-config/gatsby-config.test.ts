import path from 'path';
import * as fs from 'fs';
import gatsbyConfig from './gatsby-config';

const gatsbyPagesFolderPath = ['src', 'pages'];

const pathToPage = (page: string): string =>
  path.resolve(
    __dirname,
    '..',
    ...gatsbyPagesFolderPath,
    `${page === '' ? 'index' : page}.tsx`
  );

describe('Pages config', () => {
  it('has all the pages specified covered by a matching source file', async () => {
    // Act
    const missingPageNames = gatsbyConfig.siteMetadata.pages
      .map((page) => ({
        name: page.name,
        exists: fs.existsSync(pathToPage(page.link))
      }))
      .filter((page) => !page.exists)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((missingPage) => missingPage.name);

    // Assert
    expect(missingPageNames).toEqual([]);
  });
});
