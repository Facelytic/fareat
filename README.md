# fareat

implementing face recognition for absent using comsume api such as face comparison and face analysis


## API EndPoint

1. Users

Route | HTTP | Description
----- | ---- | -----------
/api/users/signin | POST |  Sign in while get an access token based on credentials
/api/users | GET | Get all users info
/api/users/:id | GET | user single user information
/api/users | POST | create users admin only
/api/users/:id | DELETE | Delete user (admin only)
/api/users/:id | PUT | Update a user with new info (admin and authenticate user)

2. Students

Route | HTTP | Description
----- | ---- | -----------
/api/students | GET | Get all students info
/api/students/:id | GET | user single user information
/api/students | POST | create students admin only
/api/students/:id | DELETE | Delete students (admin only)
/api/students/:id | PUT | Update a students with new info (admin and authenticate user)

3. Absents

Route | HTTP | Description
----- | ---- | -----------
/api/absents | GET | Get all absents info
/api/absents/:subject/:class_name | GET | Get one absent info By subject and class_name
 /api/absents/ | POST | Create absent
 /api/absents/:student_id | PUT | Update absents By student_id
 /api/absents/:id | DELETE | Delete absent by Id



## How To Install
clone the repository first and do step by step below
```bash
npm install
npm start / yarn start
```
it will directly open your browser with address localhost:3000

### author
1. [erwinwahyura](https://github.com/erwinwahyura)
2. [sidikriders](https://github.com/sidikriders)
3. [1000pilar](https://github.com/1000pilar)
