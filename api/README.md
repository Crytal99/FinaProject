# Shopify App Backend Scaffolding
## Requirements
Install docker and docker compose
## Setup
Step 1: Copy .env.example to .env

Step 2: Create Shopify App (if you already have one, skip to step 3)

Step 3: Get shopify api key, secret and scopes then put it to .env
```
SHOPIFY_API_KEY={your_api_key}
SHOPIFY_API_SECRET={your_api_secret}
SHOPIFY_API_SCOPES={your_api_scopes}
```

Step 4: Run `docker-compose up -d`

Step 5: Exec to shopify-app-api by `docker-compose exec -it scaffolding-api bash` and run following commands
```
$ composer install
$ php artisan key:generate
$ php artisan jwt:secret
$ php artisan migrate --seed
```
