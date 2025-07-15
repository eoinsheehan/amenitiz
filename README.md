# Amenitiz Technical Assignment

The purpose of this application is to provide a check out service for calculating the cost of products which a customer wishes to buy.

The customer can calculate the cost of the checkout in any order.

## System dependencies
- Docker
- Ruby (version specified in .ruby-verion file)
- Rails
- Node (version specified in .nvmrc file)
- Yarn

## Database creation
Run `docker compose up` to initialise a Postgres DB locally
Once this is up and running you can run:
`bundle exec rails db:create` (To connect rails to the database)
`bundle exec rails db:migrate` (To run migrations to establish the DB Schema)
`bundle exec rails db:seed` (To populate the appropriate sample data)

## Running the application locally.
Assuming PostgresDB has been initialised successfully

1. Run `bin/vite dev` To start the vite server for frontend assets
2. Run `bundle exec rails s` To start the rails server locally.

## How to run the test suite
`bundle exec rspec spec` - To run ruby based tests
`yarn test` - To run JavaScript test suite using Vitest

Note:
A local instance of a chromium based browser is required for capybara feature tests to be run


