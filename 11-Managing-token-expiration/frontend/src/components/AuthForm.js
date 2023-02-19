import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {

  // to get action data, data returned by action function submitted by form in Authenticaton.js
  const data = useActionData();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'; // has state property that holds current submission state


  const [searchParams] = useSearchParams();
  // .get() method allow us to retrieve the value for specific query parameter
  const isLogin = searchParams.get('mode') === 'login';


  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {/* to check if we have some action returned data or a redirect */}
        {data && data.errors && (
          <ul>
            {/* errors will be an obj, data.err which gives arr of error msgs */}
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        {/* to check if data has msg */}
        {data && data.message && (
          <p>{data.message}</p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
