import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  
  const token = useLoaderData();

  const submit = useSubmit();

  useEffect(() => {
    if(!token) {
      return;
    }

    if(token === 'EXPIRED') {
      // null as no data to submit, this will trogger logout route and start logout process
      submit(null, {action: '/logout', method: 'post'});
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      // null as no data to submit, this will trogger logout route and start logout process
      submit(null, {action: '/logout', method: 'post'});
    }, tokenDuration);

  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
