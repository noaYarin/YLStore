# YL - clothing store

YL is a clothing store.
User can sign up and sign in,
filter the store by item name or item price if the filter is not found user will get no results.
Add an item to the basket or delete it.
Admin user can do CRUD on items.
Enjoy shopping!

## Run Locally

Clone the project

```bash
  git clone
```

Go to the project directory

```bash
  cd clothingStore
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm run dev
```

Start the client

```bash
  npm serve
```

## Tech Stack - MEAN

**Client:** Angular
**Server:** Node, Express
**DB:** MongoDB

## API Reference

## User

#### signUp

```http
  POST /user/signUp
```

| Fields     | Type      |
| :--------- | :-------- |
| `UserName` | `string`  |
| `Email`    | `string`  |
| `Password` | `string`  |
| `IsAdmin`  | `boolean` |

#### signIn

```http
  POST /user/signIn
```

| Fields     | Type     |
| :--------- | :------- |
| `Email`    | `string` |
| `Password` | `string` |

## Store

#### Get all items

```http
  GET /item/getAllItems
```

#### Get item by id

```http
  GET /item/getItem/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Add new item - only for admin

```http
  POST /item/addItem
```

| Fields        | Type     |
| :------------ | :------- |
| `Image`       | `string` |
| `Title`       | `string` |
| `Description` | `string` |
| `Price`       | `string` |

#### Update item by id - only for admin

```http
  GET /item/updateItem/${id}
```

| Parameter | Type     |
| :-------- | :------- |
| `id`      | `string` |

#### Delete item by id - only for admin

```http
  GET /item/deleteItem/${id}
```

| Parameter | Type     |
| :-------- | :------- |
| `id`      | `string` |

## Screenshots

<img src= >
<img src= >
<img src= >

## Developer

Me :angel:
