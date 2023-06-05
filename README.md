-Documentation: doc.pdf

-Setting up the project on Linux machine/Remote server:

    -Execute "sudo apt-get update" and "sudo apt-get upgrade"
    -Install Nodejs using the following command: "sudo apt install nodejs"
    -Install npm using: "sudo apt install npm"
    -Verify the Nodejs version using: "node -v" or "node -version"
    -Verify the npm version using: "npm -v" or "npm -version"
    -Clone the repository using: "git clone https://github.com/nm-aaravind/GDSC_Task.git"
    -Go into the repository using: "cd GDSC_Task/"
    -Create .env file inside GDSC_Task folder with the following content:
        JWT_SALT="gdsctask"
        PORT=3000
        ADMIN_USER_ID="admin@google.com"
        ADMIN_PASSWORD="admin"
    -Install the packages and dependencies using: "npm i"
    -Use the following command to start the server on PORT 3000: "npm start" or "npx nodemon src/index.js"

-Database:

    -MongoDB connects to:"mongodb://127.0.0.1:27017/gdsc"
    -gdsc is the name of database

-Models used in the project:

    -MongoDB is used as database and mongoose is used as ODM.
    -This project uses two models namely Student and Course.
    -Student model fields are:
        -regno->Number,unique
        -password->String(Stored encrypted password)
        -courses->Array of ObjectId(Courses),reference:Course
    -Course model fields are:
        -courseName->String,unique
        -courseCode->String,unique
        -capacity:Number,min:0
        -students->Array of ObjectId(Student),reference:Student





