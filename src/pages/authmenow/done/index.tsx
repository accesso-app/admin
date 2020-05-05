import * as React from 'react';
import { useLocation } from 'react-router';

import * as model from './model';

export const AuthmenowDonePage: React.FC = () => {
  const query = useQuery();
  React.useEffect(() => {
    model.pageLoaded({
      code: query.code,
      state: query.state,
      error: query.error,
    });
  }, [query.code, query.state, query.error]);

  return <div>Authenticating...</div>;
};

function useQuery() {
  const location = useLocation();

  return React.useMemo(
    () => Object.fromEntries(new URLSearchParams(location.search)),
    [location.search],
  );
}
