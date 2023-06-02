# This is the mini-project repository named Study Connect

    This repository contain backend and frontend. A Study Connect is a place to share your own notes and read other notes at the same time.

## Stack Technologies

    - Frontend: React.js
    - Backend: Node.js with Express.js
    - Database: MariaDB/MySQL2

  ## Features

  | Feature        | Description                                |
  | -------------- | :----------------------------------------- |
  | login/register | signup and login to Study Connect          |
  | show all notes | show all note that the user wrote          |
  | view note      | view details of the note                   |
  | shared notes   | show all note that other users wrote       |
  | create note    | create a note with a title and description |
  | edit note      | edit the details of note                   |
  | delete note    | remove the note                            |

  ## To run the frontend in developmode

  cd to frontend then run.

  ```
      npm install
  ```

  then
  use

  ```
      npm run dev
  ```

  ## To run the backend in developmode

  cd to backend then run.

  ```
      npm install
  ```

  then
  use

  ```
      nodemon index.js
  ```

  # Study Connect App API

  ### All of the responses will be wrapped with this data before sending

  | Parameter |  Type   | Description              |
  | --------- | :-----: | :----------------------- |
  | success   | boolean | the status of request    |
  | msg       | string  | message for each request |
  | data      |  JSON   | the actual data          |

  #### URL

  `POST /auth/login`

  #### Request Body

  | Parameter |  Type  | Description                                                                                |
  | --------- | :----: | :----------------------------------------------------------------------------------------- |
  | email     | String | email                                                                                      |
  | password  | String | password must be at least 8 characters with uppercase letter, lowercase letter and number. |

  Example

  ```
  {
      "email" : "nonsomroop@gmail.com",
      "password" : "Non12345"
  }


  ```

  #### Success

  Response

  ###### Status Code

  ` 200` login success

  | Parameter |  Type  | Description |
  | --------- | :----: | :---------- |
  | email     | String | user email  |
  | username  | String | username    |
  | id        | String | user id     |

  Example

  ```
  {
      "success": true,
      "message": "login success",
      "user": {
          "id": 8,
          "email": "nonsomroop@gmail.com",
          "first_name": "Non",
          "last_name": "Somroop",
          "is_admin": 0,
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...E"
  }

  ```

  **noted: If success, the Response will be sent with cookie named UserToken**

  ### Register

  #### URL

  `POST /auth/register`

  #### Request Body

  | Parameter |  Type  | Description |
  | --------- | :----: | :---------- |
  | firstname | String | firstname   |
  | lastname  | String | surname     |
  | email     | String | email       |
  | password  | String | password    |

  Example

  ```
  {
      "firstname":"Non",
      "lastname":"Somroop",
      "email":"nonsomroop@gmail.com",
      "password" : "Non12345"
  }

  ```

  #### Success

  ###### Status Code

  ` 200` register success

  no response body

  ### Check Login

  #### URL

  `GET /auth/checklogin`

  #### Request Body

  | Parameter |  Type  | Description          |
  | --------- | :----: | :------------------- |
  | user      | String | decode token of user |

  Example

  ```
  {
      "user":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...E"
  }

  ```

  #### Success

  Response

  `200` "User is logged in with ID: " + decoded.userId

  ### get logged in user

  #### URL

  `GET /user/:userId`

  #### Request Body

  | Parameter | Type | Description |
  | --------- | :--: | :---------- |
  | userId    | int  | Id of user  |

  #### Success

  ###### Status Code

  ` 200` got data

  | Parameter |  Type  | Description |
  | --------- | :----: | :---------- |
  | id        |  int   | user id     |
  | email     | String | user email  |
  | firstname | String | first name  |
  | lastname  | String | surname     |

  Example

  ```
  {
      "id": 8,
      "email": "nonsomroop@gmail.com",
      "first_name": "Non",
      "last_name": "Somroop",
      "is_admin": 0,
  }

  ```

  ### getAllNotes

  #### URL

  `GET /note/notes/:userId`

  #### Request Body

  No Request Body

  #### Success

  ###### Status Code

  ` 200` found notes

  Response

  | Parameter    |     Type      | Description               |
  | ------------ | :-----------: | :------------------------ |
  | no parameter | Array of note | all notes related to user |

  #### note

  the note object
  | Parameter | Type | Description |
  |----------|:-------------:|:------|
  | id | string | id of note |
  | title | string | note title |
  | content | string | note description |
  | createdAt | DateTime | create Time |
  | updatedAt | DateTime | latest updated time |

  Example

  ```
  [
      {
          "id": 7,
          "user_id": 7,
          "title": "ewww",
          "content": "wwwwwwww",
          "created_at": "2023-05-20T07:17:01.000Z",
          "updated_at": "2023-05-20T07:17:01.000Z"
      },
      {
          "id": 11,
          "user_id": 7,
          "title": "My db chai mai dai",
          "content": "mai whai leaw",
          "created_at": "2023-05-21T00:37:22.000Z",
          "updated_at": "2023-05-21T00:37:22.000Z"
      },
      ...
  ]

  ```

  ### Get note

  get note by id

  #### URL

  `GET /note/:noteId`

  ### Parameter

  | Parameter |  Type  | Description |
  | --------- | :----: | :---------- |
  | noteId    | String | id of note  |

  #### Request Body

  No Request Body

  #### Success

  Response

  ###### Status Code

  ` 200` success

  | Parameter |   Type   | Description         |
  | --------- | :------: | :------------------ |
  | id        |  string  | id of note          |
  | user_id   |  string  | id of user          |
  | title     |  string  | note title          |
  | content   |  string  | note description    |
  | updatedAt | DateTime | latest updated time |
  | createdAt | DateTime | create Time         |

  Example

  ```
      {
          "id": 7,
          "user_id": 7,
          "title": "ewww",
          "content": "wwwwwwww",
          "created_at": "2023-05-20T07:17:01.000Z",
          "updated_at": "2023-05-20T07:17:01.000Z"
      }

  ```

  ### editNote

  #### URL

  `PATCH /note/notes`

  #### Request Body

  | Parameter |  Type  | Description      |
  | --------- | :----: | :--------------- |
  | noteId    | string | id of note       |
  | title     | string | note title       |
  | content   | string | note description |

  #### Success

  Response

  ###### Status Code

  ` 200` success

  | Parameter |   Type   | Description         |
  | --------- | :------: | :------------------ |
  | id        |  string  | id of note          |
  | title     |  string  | note title          |
  | content   |  string  | note description    |
  | updatedAt | DateTime | latest updated time |
  | createdAt | DateTime | create Time         |

  Example

  ```
      {
          "id": 7,
          "user_id": 7,
          "title": "ewww",
          "content": "wwwwwwww",
          "created_at": "2023-05-20T07:17:01.000Z",
          "updated_at": "2023-05-20T07:17:01.000Z"
      }

  ```

  ### Create Note

  #### URL

  `POST /note/`

  #### Request Body

  | Parameter |  Type  | Description      |
  | --------- | :----: | :--------------- |
  | title     | string | note title       |
  | content   | string | note description |

  #### Success

  Response

  ###### Status Code

  ` 200` success

  | Parameter |   Type   | Description         |
  | --------- | :------: | :------------------ |
  | id        |  string  | id of note          |
  | title     |  string  | note title          |
  | content   |  string  | note description    |
  | updatedAt | DateTime | latest updated time |
  | createdAt | DateTime | create Time         |

  Example

  ```
      {
          "id" : "1",
          "title" : "Note1",
          "content" : "today is a good day",
          "updatedAt" : "2023-04-25T14:58:58.264Z",
          "createdAt" : "2023-04-25T14:58:58.264Z",
      }

  ```

  ### Delete Note

  #### URL

  `DELETE /note/:noteId`

  ### Parameter

  | Parameter |  Type  | Description |
  | --------- | :----: | :---------- |
  | noteId    | String | id of note  |

  #### Request Body

  No Request Body

  #### Success

  Response

  ###### Status Code

  ` 200` delete success

  no response body

  ### Get all shared notes

  #### URL

  `GET /note/sharednotes`

  #### Request Body

  No Request Body

  #### Success

  ###### Status Code

  ` 200` found notes

  Response

  | Parameter    |         Type         | Description                     |
  | ------------ | :------------------: | :------------------------------ |
  | no parameter | Array of shared note | all notes related to other user |

  #### note

  the note object
  | Parameter | Type | Description |
  |----------|:-------------:|:------|
  | id | string | id of note |
  | title | string | note title |
  | content | string | note description |
  | createdAt | DateTime | create Time |
  | updatedAt | DateTime | latest updated time |

  Example

  ```
  [
      {
          "id": 1,
          "user_id": 1,
          "title": "Database Design",
          "content": "Introduction to database design...",
          "created_at": "2023-05-08T10:08:57.000Z",
          "updated_at": "2023-05-08T10:08:57.000Z"
      },
      {
          "id": 2,
          "user_id": 2,
          "title": "Object-Oriented Programming",
          "content": "Fundamentals of OOP...",
          "created_at": "2023-05-08T10:08:57.000Z",
          "updated_at": "2023-05-08T10:08:57.000Z"
      },
      {
          "id": 3,
          "user_id": 3,
          "title": "Web Development",
          "content": "HTML, CSS, JavaScript...",
          "created_at": "2023-05-08T10:08:57.000Z",
          "updated_at": "2023-05-08T10:08:57.000Z"
      },
      {
          "id": 4,
          "user_id": 4,
          "title": "Data Structures",
          "content": "Arrays, Linked Lists, Trees...",
          "created_at": "2023-05-08T10:08:57.000Z",
          "updated_at": "2023-05-08T10:08:57.000Z"
      },
      {
          "id": 5,
          "user_id": 5,
          "title": "Algorithms",
          "content": "Sorting, Searching, Graph Algorithms...",
          "created_at": "2023-05-08T10:08:57.000Z",
          "updated_at": "2023-05-08T10:08:57.000Z"
      },
      {
          "id": 6,
          "user_id": 6,
          "title": "My New Note",
          "content": "This is a sample note.",
          "created_at": "2023-05-20T06:51:16.000Z",
          "updated_at": "2023-05-20T06:51:16.000Z"
      },
      {
          "id": 7,
          "user_id": 7,
          "title": "ewww",
          "content": "wwwwwwww",
          "created_at": "2023-05-20T07:17:01.000Z",
          "updated_at": "2023-05-20T07:17:01.000Z"
      },
      {
          "id": 11,
          "user_id": 7,
          "title": "My db chai mai dai",
          "content": "mai whai leaw",
          "created_at": "2023-05-21T00:37:22.000Z",
          "updated_at": "2023-05-21T00:37:22.000Z"
      },
      {
          "id": 19,
          "user_id": 10,
          "title": "CSC105",
          "content": "Bye",
          "created_at": "2023-06-01T07:08:43.000Z",
          "updated_at": "2023-06-01T07:08:43.000Z"
      }
  ]

  ```
