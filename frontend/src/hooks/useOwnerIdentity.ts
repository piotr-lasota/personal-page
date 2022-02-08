import { useQuery } from 'react-query';
import api from '../api';

const OwnerRole = 'owner';

type OwnershipStatus = undefined | boolean;

const useOwnerIdentity = (): OwnershipStatus => {
  const { data: principal } = useQuery(
    'clientPrincipal',
    api.getClientPrincipal
  );

  if (principal) {
    return !!principal?.userRoles?.find((role) => role === OwnerRole);
  }

  return undefined;
};

export default useOwnerIdentity;
