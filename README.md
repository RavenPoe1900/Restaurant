<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

```bash
$ yarn
```

## Compile and run the project

```bash
# development
$ npm run start

# prismna push
$ npx prisma db push

# watch mode
$ npm run start:dev

# prismna seed
$ npx prisma db seed

# production mode
$ npm run start:prod
```

```bash
# Restaurant Management System

## Objective
Develop a comprehensive restaurant management system that allows managing users, customers, reservations, tables, orders, 
and roles efficiently, improving the experience for both restaurant staff and customers.

## Data Models

### 1. Restaurant
- **Description**: Represents a restaurant with basic information such as name, address, capacity, and license type.
- **Relationships**:
  - Has multiple **Users** (system users).
  - Can have multiple **Clients** (customers).

### 2. User
- **Description**: Represents the users of the system, including administrators and restaurant staff.
- **Key Attributes**: Email, password, name, active status, and role.
- **Relationships**:
  - Can be associated with a **Role** that defines its permissions.
  - Can be linked to multiple **Restaurants**.

### 3. Role
- **Description**: Defines the roles of users, including specific permissions.
- **Relationships**:
  - Can have multiple **Users**.
  - Associated with multiple **Permissions**.

### 4. Permission
- **Description**: Defines the permissions that can be assigned to roles.
- **Key Attributes**: Path, HTTP method, and active status.
- **Relationships**:
  - Can be associated with multiple **Roles**.

### 5. Client
- **Description**: Represents the customers visiting the restaurant, including personal information and status.
- **Relationships**:
  - Can have multiple **Reservations**.
  - Can be associated with multiple **Tables**.

### 6. Reservation
- **Description**: Represents a reservation made by a customer, including date, time, and reservation status.
- **Relationships**:
  - Associated with a **Client**.
  - Can be linked to a **Restaurant**.

### 7. Table
- **Description**: Represents the tables available at the restaurant, including their status and total price.
- **Relationships**:
  - Associated with a **Client**.
  - Can have multiple **Orders**.

### 8. Order
- **Description**: Represents an order placed at a table, including total price and order status.
- **Relationships**:
  - Associated with a **Table**.
  - Can have multiple **OrderItems**.

### 9. OrderItem
- **Description**: Represents a specific item within an order, including quantity and price.
- **Relationships**:
  - Associated with an **Order**.
  - Can be linked to multiple **Items**.

### 10. Item
- **Description**: Represents the items on the restaurant menu, including name, description, and price.
- **Relationships**:
  - Associated with an **OrderItem**.

## Enumerations
- **ReservationStatusEnum**: Defines the status of a reservation (PENDING, NOT_CONFIRMED, CANCELLED, CONFIRMED).
- **OrderStatusEnum**: Defines the status of an order (OPEN, CLOSE, COMPLIMENTARY_BILL, HOUSE_ACCOUNT).
- **TableStatusEnum**: Defines the status of a table (OPEN, CLOSE, COMPLIMENTARY_BILL, HOUSE_ACCOUNT).
- **ClientStatusEnum**: Defines the status of a customer (IN_PLACE, HE_WENT_AWAY).

## Conclusion
This restaurant management system is designed to streamline the management of daily operations, facilitating interaction 
between users, customers, and the different elements of the restaurant. The data structure allows for efficient and scalable 
management, ensuring that every aspect of customer service is effectively addressed.
This restaurant management system utilizes a multi-tenant architecture, allowing multiple restaurants to share the same database
while keeping their data completely isolated. This ensures that each restaurant operates independently, optimizing resources
and facilitating scalability and maintenance. Each restaurant can manage its information, menus, and orders securely, guaranteeing
 a personalized experience without interference.

## Additional Information
- **Dynamic Role Creation**: Users can create roles with specific permissions tailored to their needs, enhancing flexibility in user
 management.
- **Auto-Generation of Users**: The system supports the automatic generation of user accounts, making it easier to onboard new staff
 members.
- **Prisma Seed**: A seed script is provided to populate the database with sample data, allowing for easy testing and development.
 This can be executed using the Prisma CLI to quickly set up a working environment.

## Environment Variables

The following environment variables are required for the proper configuration of the Restaurant Management System:

- **EMAIL**:
  - **Description**: The email address of the admin user for the system.
  - **Example**: `'admin@example.com'`

- **PASSWORD**:
  - **Description**: The hashed password for the admin user.
  - **Example**: `'hashedPassword1@.'`

- **FIRST_NAME**:
  - **Description**: The first name of the admin user.
  - **Example**: `'Admin'`

- **LAST_NAME**:
  - **Description**: The last name of the admin user.
  - **Example**: `'User'`

- **RESTAURANT_LICENSE_TYPE**:
  - **Description**: The type of license for the restaurant.
  - **Example**: `'Type A'`

- **RESTAURANT_PHONE**:
  - **Description**: The contact phone number for the restaurant.
  - **Example**: `"1212121212"`

- **POSTGRES_USER**:
  - **Description**: The username for the PostgreSQL database.
  - **Example**: `postgres`

- **POSTGRES_PASSWORD**:
  - **Description**: The password for the PostgreSQL database user.
  - **Example**: `postgres`

- **POSTGRES_DB**:
  - **Description**: The name of the PostgreSQL database to be used.
  - **Example**: `postgres`

- **SECRET**:
  - **Description**: A secret key used for signing tokens and securing sensitive information.
  - **Example**: `"u>??[3c$a/yU1,`sJ4fR8@BYj*GRz'&nlgXxsZ{N**55._{PAdK]y&1f'T/[:+"`

- **EXPIRESIN**:
  - **Description**: The duration for which tokens are valid (expiration time).
  - **Example**: `"240h"` (240 hours)



```

````bash
## Deployment

When you are ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs 
as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our 
official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploys
````

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
