import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  
  const token = useLoaderData();

  const submit = useSubmit();

  useEffect(() => {
    if(!token) {
      return;
    }

    setTimeout(() => {
      // null as no data to submit, this will trogger logout route and start logout process
      submit(null, {action: '/logout', method: 'post'})
    }, 1 * 60 * 60 * 1000);

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
