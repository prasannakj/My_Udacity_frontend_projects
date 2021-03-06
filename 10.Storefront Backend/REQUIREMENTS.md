# API Requirements

## Endpoints

**INFO:** 
Token required means that these endpoint need authentication. Therefore, you need to pass a bearer token in authorization header.
To allow user creation and authentication we have two user endpoint `POST /api/users` and `POST /api/users/login`.
The login endpoint returns a token which can be used in authorization header.

Different to the requirements create user endpoint is not token required for better testing.  

### Products

| Method | Request Type | URL | Token required |
|--------|--------------| --- | -------------- |
| Index | GET |`/api/products` | false |
| Show | GET |`/api/products/:id` | false |
| Create | POST |`/api/products` | **true** |
| Delete | DELETE | `/api/products/:id` | **true** |
| Top 5 most popular products [OPTIONAL] | GET | TODO | false // orders count products limit 5
| Products by Category | GET | `/api/products/category/:category` | false

#### Create `POST /api/products`
example request body:
````JSON
{
  "name": "Product Name",
  "price": "99.99",
  "category": "Category Name"
}
````

### Users

| Method | Request Type | URL | Token required |
|--------|--------------| --- | -------------- |
| Index | GET |`/api/users` | **true**
| Show | GET |`/api/users/:id` | **true**
| Create | POST |`/api/users` | **false**
| Delete | DELETE | `/api/users/:id` | **true**
| Login | GET | `/api/users/login` | **false**

#### Create `POST /api/users`
example request body:
````JSON
{
  "firstname": "User",
  "lastname": "Name",
  "password": "safe"
}
````

#### Login `POST /api/users/login`
example request body:
````JSON
{
  "firstname": "User",
  "lastname": "Name",
  "password": "safe"
}
````

### Orders

| Method | Request Type | URL | Token required |
|--------|--------------| --- | -------------- |
| Index | GET |`/api/orders` | **true**
| Show | GET |`/api/orders/:id` | **true**
| Create | GET |`/api/orders` | **true**
| showCurrentByUserId | GET |`/api/orders/user/:id` | **true**
| showCompletedByUserId | GET |`/api/orders/user/:id/complete` | **true**

#### Create `POST /api/orders/`
example request body:
````JSON
{
  "products": [
    {
      "product_id": 1,
      "quantity": 1
    },
  ],
  "order_completed": false,
  "user_id": 1
}
````


## Data Shapes

### Product

- id
- name
- price
- [OPTIONAL] category

### User

- id
- firstName
- lastName
- password

### Orders

- id
- user_id
- status of order (completed true or false)

### OrdersProducts
- order_id references to the order 
- product_id refernces to the product
- product quantity 

## Data Schema

`````sql
CREATE Table products(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(30), 
    price numeric,
    category VARCHAR(30)
);

CREATE Table users(
     id SERIAL PRIMARY KEY,
     firstname VARCHAR(30),
     lastname VARCHAR(30),
     password VARCHAR(255)
);

CREATE Table orders(
    id SERIAL PRIMARY KEY,
    user_id bigint,
    completed boolean,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders_products(
    quantity int,
    order_id bigint, 
    FOREIGN KEY (order_id) REFERENCES orders(id),
    product_id bigint, 
    FOREIGN KEY (product_id) REFERENCES products(id)
)
`````
