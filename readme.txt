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
 context variable token