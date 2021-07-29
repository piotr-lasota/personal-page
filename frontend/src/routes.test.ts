import { HOME, toMatchingDashboardLocation } from './routes';

describe(toMatchingDashboardLocation.name, () => {
  it("returns HOME for '/'", () => {
    // Arrange, Act & Assert
    expect(toMatchingDashboardLocation('/')).toBe(HOME);
  });

  it('throws Error if not found', () => {
    // Arrange
    const nonExistingRoute = '/thisRouteDoesNotExist';

    // Act & Assert
    expect(() => toMatchingDashboardLocation(nonExistingRoute)).toThrowError(
      'location not found'
    );
  });
});
