***************************************
Repo:         portfolio-1
App:          portfolio----1
DB:           1on1 / 1on1_test
***************************************


http post :5000/api/auth/register username=josh password=1234

=======================================

Auth flow:
-User clicks login button
-onLoginHandler triggered
  --Currently using onClick of button for "Login"
  --Same for onClick of button for "Register"
  --TODO: Change to onSubmitHandler and have single button
          and state to determine if user is in login
          or registration mode.
          -These will actually be seen as different pages by user.
          -Use aesthetics of Unit-2 project login/registration forms.
-Username and password sent from state to backend
 via post request to /login.
-in backend (/api/auth/auth-router.js) the 
 post request to /api/auth/login is handled
-The user row from Users table is retrieved
 via the UsersModel.findBy method
 searching for the username which was 
 retrieved (with the un-hashed password entered)
 from the body of the post request.
-If user row is found, then the password is 
 cryptgraphically hashed and compared against
 the stored hashed password in the row.
-If it matches, then generate a JWT-token.
-Token encodes:
  --1. user id
  --2. username
  --3. user role
-Token is then returned in response.
-On frontend, (back in onLoginHandler())
 the token from the response is placed in
 context variable token, which then
 (via !!token) stores the isLoggedIn
 state.
-Also, the JWT is decoded and the userId, username, and role
 are also stored in context under the user property:
 user: {
   userId,
   username,
   role
 }
  --NOTE: We are not verifying the token on the frontend here. Can't a hacker just change the variable token to something not falsey, and that would then allow the frontend protected routes to be accessed?
    ---This is okay because in order to get any data fromt he backend for an authorized user they must send the token in the request which IS verified.
-Token is placed in local storage.
-useEffect is used to check if the token is found in local-storage.
  --If it is, then execute the login(token) function
    which sets context for the token property.
-Next, when the logged in user presses the "Get Users"
 button, a GET request is made to /api/users,
 which has a protected middleware function in front of it.
-The protected middleware is /api/auth/auth-middleware.js -> restricted(req, res, next)
  --The token is grabbed from the header
      const token = req.headers.authorization;
  --Note that headers.Authorization: token, is set in the request.
-The token is then jwt-verified for validity.
-The token is then decoded, and the decoded
 values are stored on the decodedJwt property
 of the request object and passed onwards
 through the middleware pipeline.
-The getUsers() function from the users-controller
 is then invoked which runs the usersModel.getAllUsers()
 async method to hit the DB to grab all users.
-Once the promise resolves, the users are 
 returned to the frontend via the HTTP response.
-

TOOD:
  -Authorization:
    --When sending request to update some protected resource
      (e.g. an appointment for a given user),
      we want to verify the appointment corresponds to 
      the user correct user.