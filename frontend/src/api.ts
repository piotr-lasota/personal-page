type Claim = {
  typ: string;
  val: string;
};

type ClientPrincipal = {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
  claims?: Claim[]; // only applicable when used with custom authentication provider
};

const getClientPrincipal = async (): Promise<ClientPrincipal> => {
  const response = await fetch('/.auth/me');

  if (!response.ok) {
    throw new Error('Failed fetching the principal');
  }

  const { clientPrincipal: principal }: { clientPrincipal: ClientPrincipal } =
    await response.json();

  return principal;
};

export default {
  getClientPrincipal
};
