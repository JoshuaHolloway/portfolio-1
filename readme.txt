=======================================
-Setup base project & local/remote repo 

npx gitignore node
git init
git checkout -b main
git status
ls -lah
  (to see the hidden .git folder created)

-Create public remote github repo (leave all options unchecked)
git remote add origin https://github.com/JoshuaHolloway/portfolio-2.git

-Push:
git add .
git commit -m "base project to deploy"
git push origin main
  --Do NOT do: git push -U origin main, etc.
  --Be explicit where it is we are pushing to.
  --We are pushing to the remote called 'origin'
  --What are we pushing?  A.) The 'main' branch

-Refresh public repo
  --Default branch should be main and base project should be uploaded.
  --Aparenetly, the master branch is overwritten by main.

-After first push above, make mod to codebase and do following once (standard push afterwards):
git add .
git commit -m "set remote as upstream"
git push --set-upstream origin main

=======================================
-Configure ESLint:

npx eslint --init

√ How would you like to use ESLint? · check syntax and find problems    
√ What type of modules does your project use? · commonjs
√ Which framework does your project use? · none
  --NOTE: Choose none, even though
          we will be using React.
          React will have its
          own ESLint configuration.
√ Does your project use TypeScript? · No
√ Where does your code run? · node
√ What format do you want your config file to be in? · JSON
Local ESLint installation not found.
√ Would you like to install them now with npm? · Yes

=======================================
-Install dependencies:

npm i -D nodemon cors (install --save-dev)
npm i express dotenv (install --save)

=======================================
-Add scripts
"server": "nodemon index.js",
"start": "node index.js",
"heroku-postbuild": "cd client && npm i && npm run build"

- - - - - - - - - - - - - - - - - - - -

-The last one tells Heroku to generate 
 the frontend build.

- - - - - - - - - - - - - - - - - - - -

-Specify "engines" (versions to use)
 in package.json.
-Below versions are conservative
 and work well with Postgress.
"engines": {
  "node": "14.12.0",
  "npm": "6.14.8"
},

=======================================
-terminal commands:
--------------
env
--------------
node
console.log(process.env);
console.log(process.env.PATH);
-------------

=======================================
-Create .env file
PORT=9000
NODE_ENV=development
SECRET="blue magic"

==============
-Create config.js
module.exports = {
  PORT: process.env.PORT || 5e3,
};

=======================================
-Create a react app via npx create-react-app
 in /client.

-List your global npm installs:
npm list -g (this is same as: npm list -g --depth=0)

=======================================
-Frontend env-vars:

  --Add.env.dev and .env.prod
    ---.env.dev
      REACT_APP_BACKEND=http://localhost:9000/api
    ---.env.prod
      REACT_APP_BACKEND=/api
  --Install:
      "env-cmd": "^10.1.0",
  --Modify start scripts:
    "start": "env-cmd -f .env.dev react-scripts start",
    "build": "env-cmd -f .env.prod react-scripts build",
  --Use env-var as follows:
      fetch( `${process.env.REACT_APP_BACKEND}/api/users`).then(() => {}).catch(() => {});

=======================================
-Test in browser F12 console:
fetch('http://localhost:9000/api/users').then(() => console.log('success')).catch(() => console.log('ERROR'))


=======================================
-Point custom namecheap domain to the Heroku app: 
  --Namecheap article explaining process:
    -----https://www.namecheap.com/support/knowledgebase/article.aspx/9737/2208/pointing-a-domain-to-the-heroku-app/
    ---Add custom domain to Heroku app:
      ----Heroku -> App: "portfolio----2" -> Settings -> Domains -> "Add domain":
        ---AmazonTulsa.com
        ---www.AmazonTulsa.com
    ---Copy the DNS targets for each custom domain from previous step.
      ----Paste into: NameCheap -> Domain List -> AmazonTulsa.com -> Manage -> 
                      -> Advanced DNS -> Host Records:
          -----CNAME Record:
            ------Host: www
            ------Value: <DNS target for www.AmazonTulsa.com>
          -----ALIAS Record:
            ------Host: @
            ------value: <DNS target for AmazonTulsa.com>
    ---Update CNAME and ALIAS Record at namecheap
    ---SSL certificate for HTTPS connection



    