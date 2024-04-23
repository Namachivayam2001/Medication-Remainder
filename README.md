<h1 align="center">
    MEDICATION REMAINDER WITH PREDICTION FEATURES
</h1>

<h3 align="center">
Streamline Medicin management, add user, Seamlessly check obesity, Pneumonia, Diabitise and so on, assess helth, and improve health. <br>
Alert you'r parents/gordian based on missed medicin.
</h3>

# About

The `MEDICATION REMAINDER WITH PREDICTION FEATURES` is a web-based application built using the MySQL, Express.js, React.js, Node.js and python. It aims to alert user to take medicin in correct time and check the decise like pneumonia, diabetic, obesity level using prediction feature.

## Features

- **User Roles:** Each user has specify there remainders seprately.

- **Medication remainder system:** They set ther remainder by custom, Notification will send 5 times. If they don't repond the first 4 notification then last one will send to guardian.

- **Obesity Level Predictio:** Check there obesity levels through `XGBoost` machine learning model.

- **Diabetic prediction:** Check ther diabetic through `Logistic Regression` machine learning model.

- **Pneumonia predictio :** Check ther Pneumonia through `CNN` DeepLearning model.

## Technologies Used 

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MySQL

<br>

# Installation

Open 3 terminals in separate windows/tabs.
modify a file called .evn in both back-end and features-ML folder.
Inside it write this :

secret_key = = your Secret Key 

***1.Command for run front-end(React) server***
- Locate the folder `medicaton-remainder/front-end`
- run the command to install all the required react package `npm install`
- run the command to start the React server `npm start`

Terminal 1: Setting Up Frontend
```sh
cd front-end
npm install
npm start
```

***2.Command for run backend(Node) server***
- Locate the folder `medicaton-remainder/back-end`
- run the command to install all the required react package `npm install`
- run the command to start the React server `npm run dev`

Terminal 2: Setting Up backend 
```sh
cd backend
npm install
npm run dev
```

***3.Command for run features-ML(Python) server***
- Locate the folder `medicaton-remainder/features-ML`
- use virtual environment is better. If virtual environment is available just activate that
- Download the dataset using the link which was given on the top of jupyte-notebooks if dataset is not available 
- Some models are not in git repo, Because of `large size` So just run the .ipynb notebooks which model is not available
- run the command to install all the required react package `pip install -r requirements.txt`
- run the command to start the React server `python src/app.js`

Terminal 3: Setting Up features-ML 
```sh
cd features-ML
pip install -r requirements.txt
python src/app.js
```

Now, navigate to `localhost:3000` in your browser. 
The Backend API will be running at `localhost:3030`.
The python-flask API will be running at `localhost:5000`.

Here the problem is modify the email.js file from backend/email.js
alter the `user` and `pass`

```sh
   auth:{
            user: 'your email', 
            pass: 'your email pass key' 
        }
```


