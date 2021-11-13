# ADES-Homework-AcostaJacob

# Homework 3: Hosting on Heroku

For this documentation, I will not be (fully) following the Node.js documentation for Node.js. I will instead be documenting another method that I discovered which allows us to automatically deploy the code from inside a Github repository.

### 1. Creating a Heroku Account

To start, we will need to create a new Heroku account.
1. Go to Heroku's login page (https://id.heroku.com/login).

![image](https://user-images.githubusercontent.com/87067973/141652351-8320b968-09ed-4eeb-b900-b9ab2b8d1978.png)

2. Click on the *Sign Up* button.
3. After filling up the *Sign Up* form, click on the *Create Free Account*.

![image](https://user-images.githubusercontent.com/87067973/141652424-92beeac0-99b2-41a3-8e9c-3d31f989d29d.png)![image](https://user-images.githubusercontent.com/87067973/141652443-751d3a61-513b-4576-aba3-e6409f020971.png)


### 2. Create a Heroku App

Next, we need to create a Heroku app.
1. After logging in, head over to Heroku's dashboard.
	- You can either go through this link (https://dashboard.heroku.com/apps)
	- Or through the button beside the account button.
	
	![image](https://user-images.githubusercontent.com/87067973/141652512-b1e11002-609e-43b6-aeea-c8d3019fa842.png)
	
2. Inside the dashboard click on the *New* button. This will show a dropdown with 2 buttons.

	![image](https://user-images.githubusercontent.com/87067973/141652538-518cccd1-acf3-4b04-9082-07fc8d2c989f.png)

3. Click on the *Create new app*.
4. Enter the name (e.g. hw-frontend-ades)  for the new application then click on *Create App*

![image](https://user-images.githubusercontent.com/87067973/141652582-7a273161-fd39-45e6-b032-3e942a22ce84.png)

6. Since we are hosting 2 servers, backend and frontend, we'll need to create another app.
	*	To create another app, repeat steps 2 - 4.

### 3. Linking the Github Repo with Heroku

This documentation will not go through how source control and Git works in Github as it's primary purpose is to teach how to host on Heroku. So for now we'll assume that we have already put up our code inside Github.

One thing to note is when linking your Github repository with Heroku, we'll need to place the frontend and backend codes in **different repository** or **different branches**. This is because Heroku deploys the codes based on branches. I will talk more on this later. But for now, we'll assume that you hosted the frontend and backend on different branches.

1. Inside the newly created Heroku application, head over to the *Deploy* tab.

![image](https://user-images.githubusercontent.com/87067973/141652627-c69203d1-5d7b-4df6-a4a9-1166ee7cb5b0.png)

2. Under *Deployment Method*, click on Github.
	-	After doing so, Heroku will prompt you to link your Github account.
3. Under *Connect to Github*, search for your repository and connect to it.
4. After connecting, 2 new sections will be created (Automatic Deploy, Manual Deploy).

![image](https://user-images.githubusercontent.com/87067973/141652654-89b4b2c8-0281-4be9-af53-354024f9ee8d.png)

6. If you want the app to be automatically deployed whenever the branch is updated,
	- Select a branch to deploy and click on *Enable Automatic Deploys*
7. Heroku also allows us to deploy manually,
	- Likewise, just select a branch and click on *Deploy Branch*
8. Repeat steps 1 - 6 for the other frontend/backend, deploying the other part which hasn't been deployed.

Note: Notice how the when we deploy the codes in Github, we do so by selecting the repo's **branches**. 

### 4. Hosting a MySQL database inside Heroku

For most application which require dynamic content, we're going to need a database.
This documentation will show us how to host a MySQL database on Heroku.
To begin let's go to the backend app. Technically we can also choose the frontend one but the backend app is the one which usually interfaces with the database.

1. Under the *Resources* tab and the Add-ons section, click on the *Find more add-ons* button. 

![image](https://user-images.githubusercontent.com/87067973/141652695-3edde455-6497-4d2c-98bb-40883a5ef2ef.png)

2. There's many options as to which data infastructure to host the MySQL database,
	*	but the one we tested is ClearDB MySQL so let's select that one.
	
	![image](https://user-images.githubusercontent.com/87067973/141652724-0e19a47a-687a-4211-90fd-0245b3c3199e.png)
	
3. Once inside, click on the *Install ClearDB MySQL*.

	![image](https://user-images.githubusercontent.com/87067973/141652739-7556b3ff-7e73-42f4-a953-b466255b9d23.png)

	*	Afterwards, you will see the *ClearDB MySQL* under the Add-ons section.
4. Next, we need to retrieve our ClearDB credentials, go to the settings tab.
	*	Specifically we're going to need the database hostname, username and password to connect to our cloud database.
5. Scroll down till you find the *Config Vars* section, then click on the *Reveal Config Vars* button.

	![image](https://user-images.githubusercontent.com/87067973/141652773-8b1eb037-d730-4215-a083-2a339e98ae07.png)

	* mysql:/**/b7ae6c8a4557d4**:**817375f8@us-cdbr-east-04.cleardb.com**/heroku_2230e5a57d0e906?reconnect=true
	* You'll find a string that looks similar to the one above. The first bolded part indicates the username, second one indicates the password, and the last one indicates the database hostname. (i.e. b7ae6c8a4557d4 is the username, 817375f8 is the password, us-cdbr-east-04.cleardb.com is the hostname )
	* This is important because these are the credentials that we need to input to our database configs in our backend.

### 5. Procfiles
Heroku apps have a functionality called Profiles that specifies the **commands that are executed by the app on startup**. Heroku allows you to declare many different process types but that is past this documentation's intentions.

An important thing to note however is that most of the times you're going to need to execute a command to start your server.
For example to start a Node.js server:
1. Your going to need to create a Procfile file inside the 

	![image](https://user-images.githubusercontent.com/87067973/141653531-2e15066c-3eb8-4849-9fd4-655d7c81761b.png)
	
	*	The Procfile is a simple text file that is named ***Procfile*** without a *file extension*.
	*	The Procfile needs to beinside the *app's root directory*.
2. Next, add the command which starts the server.
	*	The format for declaring commands is **\<process type>: \<command>**
	*	Therefore, for starting a Node.js server, we need to add **web: nodemon server.js**
	
	![image](https://user-images.githubusercontent.com/87067973/141653904-e44d0226-3607-4fb2-9420-ed95df80a1d3.png)

Adding the file/code above ensures that **nodemon server.js** is ran when the application is deployed.
Nevertheless, I implore you to look at their documentation on how Procfiles work.
https://devcenter.heroku.com/articles/procfile
