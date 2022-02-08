type ClientPrincipal = {
  userRoles: string[];
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
