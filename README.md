# Amenitiz Technical Assignment

The purpose of this application is to provide a check out service for calculating the cost of products which a customer wishes to buy.

The customer can calculate the cost of the checkout in any order.

Administrative features include:
- Ability to add/remove products in line with availability
- Ability to add/remove offers which can be associated with products.

## Ruby version
- 3.1.2 (As specified in the .ruby-version file)

* System dependencies
- Docker
- Ruby
- Rails
- Postgres
- Node??

* Configuration

* Database creation

* Database initialization

## How to run the test suite
TODO:
bundle exec rspec (to ensure that the appropriate version of rspec is being used)

Need to have chromedriver installed locally to run the feature test suite.

## Deployment instructions
The application is automatically deployed to fly.io when branches are merged to main.

Note: In true production environment there would be a staging environment running and approvals would be required to merge changes to main.

Check: Unsure if it is possible to enforce passing cicd pipelines

## Running the application locally.
Requirements for running the app locally are as follows:
- Docker

To start the application with a Postgres DB run the following:
`docker compose up`

Postgres is exposed on port 5354??? so that this can be accessed from your local computer

then you need to run 

bundle exec rails db:create
`bundle exec rails db:migrate`
`bundle exec rails s` to get the application up and running

or alternatively

`bundle exec rails c` to inspect the application

This will start an instance of a PostgresDB locally and connect the rails application to it.
