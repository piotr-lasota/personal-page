import path from 'path';
import { existsSync } from 'fs';
import gatsbyConfig from './gatsby-config';

const gatsbyPagesFolderPath = ['src', 'pages'];

const pathToPage = (page: string): string => {
  return path.resolve(
    __dirname,
    '..',
    ...gatsbyPagesFolderPath,
    `${page === '' ? 'index' : page}.tsx`
  );
};

const routeIsAccessible = (route: string): boolean => {
  const pageFilePath = pathToPage(route);
  if (existsSync(pageFilePath)) {
    return true;
  }

  const indexFilePath = pathToPage(path.join(route, 'index'));
  return existsSync(indexFilePath);
};

describe('Pages config', () => {
  it('has all specified pages navigable', async () => {
    // Act
    const missingPageNames = gatsbyConfig.siteMetadata.pages
      .map((page) => ({
        name: page.name,
        isAccessible: routeIsAccessible(page.link)
      }))
      .filter((page) => !page.isAccessible)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((missingPage) => missingPage.name);

    // Assert
    expect(missingPageNames).toEqual([]);
  });
});
