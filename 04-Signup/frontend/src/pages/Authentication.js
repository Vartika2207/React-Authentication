import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

//  req obj gives access to the form data submitted
export async function action({request}) {

  // to get hold of route, searchParams is an obj
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  if(mode !== 'login' || mode !== 'signup') {
    // check if incorrect route 
    throw json({message: 'Unsupported mode'}, {status: 422});
  }

  // to get hold of the submitted data with form, returns a data obj which can be used to search emaol, password entered
  const data = await request.formData();
  const authData = {
    email: data.get('email'), // this gives email enetered
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:8080/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData)
  });

  if(response.status === 422 || response.status === 401) {
    return response;
  }

  if(!request.ok) {
    throw json({message: 'Could not authenticate user'}, {status: 500});
  }

  //managing token 
  //.....



  // redirect
  return redirect('/');
}