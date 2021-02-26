# Fancy Todo App Server

## RESTful endpoints

### POST /register
> Registration new user

&nbsp;

_Request Header_
```
not needed
```

_Request Body_
```
{
  username: < your username >
  email: < your email >
  password: < your password >
}
```

_Response (200 - OK)_
```
{
  "data": {
    "id": 1,
    "username": calvin,
    "email": "calvin@mail.com"
  },
  "message": "Success create calvin"
}
```
_Response (400 - Bad Request)_
```
[
  "Email is invalid or already taken"
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal server error"
]
```

&nbsp;

### POST /login
> Login user

&nbsp;

_Request Header_
```
not needed
```

_Request Body_
```
{
  email: < your email >,
  password: < your password >
}
```

_Response (200 - OK)_
```
{
    "token": < your access token >,
    "message": "Welcome calvin"
}
```

_Response (401 - Unauthorized)_
```
[
  "Invalid email or password"
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal server error"
]
```

&nbsp;

### POST /loginOauth
> Login user by Oauth Google

&nbsp;

_Request Header_
```
not needed
```

_Request Body_
```
{
    tokenOauth: < your token google oauth >
}
```

_Response (200 - OK)_
```
{
  "token": < your access token >,
  "message": "Welcome calvin@mail.com"
}
```

_Response (500 - Internal Server Error)_
```
[
  "Internal server error"
]
```

&nbsp;

### GET /todos
> Get all todo

&nbsp;

_Request Params_
```
not needed
```

_Request Header_
```
{
  "token": < your access token >
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    {
      "id": 1,
      "title": "makan",
      "description": "nasi kecap",
      "status": false,
      "due_date": "2021-02-20"
    }
  ],
  "message": "Success read 1 todo"
}
```

_Response (401 - Unauthorized)_
```
[
  "Invalid token"
]
```

_Response (500 - Internal Server Error)_
```
[
  "Internal server error"
]
```