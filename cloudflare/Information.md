## Cloudflare D1 Database (SQLite)

This folder contains the the access function to the Cloudflare D1 SQLite database. This connection is done through direct connection through cloudflare worker. The database has a max size of 10GB storage.

The schema file is file that will hold the schema for all the tables in the database. Multiple databases can be used a light edit is required to the `config.ts` file and multiple `*.sql` files foe each database.

Please refer to D1 documentation.
