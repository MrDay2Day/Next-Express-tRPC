## Cloudflare D1 Database (SQLite)

This folder contains the the access function to the Cloudflare D1 SQLite database. This connection is done through direct connection through cloudflare worker. The database has a max size of 10GB storage.

The schema file is file that will hold the schema for all the tables in the database. Multiple databases can be used a light edit is required to the `config.ts` file and multiple `*.sql` files foe each database.

Please refer to D1 documentation.

## Create D1 Database

`npx wrangler d1 create <<DATABASE NAME>>`

`wrangler.jsonc`

```JSON
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "prod-d1-tutorial",
      "database_id": "<unique-ID-for-your-database>"
    }
  ]
}
```

## Deploying D1 Database

D1 Database deployment

`npx wrangler d1 execute <<DATABASE NAME>> --<<remote | local>> --file=<<SQL LITE FILE>>`

Local Deployment

```bash
npx wrangler d1 execute prod-d1-demo --local --file=./cloudflare/database/schema.sql
```

Cloudflare Deployment

```bash
npx wrangler d1 execute prod-d1-demo --remote --file=./cloudflare/database/schema.sql
```
