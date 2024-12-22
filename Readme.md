# Chez Scheyda E-commerce Platform

This repository contains the source code for the Chez Scheyda e-commerce platform, developed using Medusa and Next.js.

## Project Overview

Chez Scheyda is an online store that offers a variety of handwoven and handcrafted products. The goal of this project is to provide a modern and efficient platform for showcasing and selling these products.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Medusa
- **Styling**: Tailwind CSS (or any other CSS framework/library you might be using)
- **Database**: PostgreSQL (or the specific database you're using with Medusa)
- **Deployment**: Vercel (for the Next.js frontend) and any relevant hosting service for the Medusa backend.

## Features

- **Product Display**: A user-friendly interface for browsing products.
- **Localization**: Support for multiple languages (English, French).
- **Cart and Checkout**: Full e-commerce functionalities including a shopping cart and checkout process.
- **User Authentication**: (Add details if you're using authentication for customer accounts)
- **Admin Interface**: (Mention if there's an admin panel for managing products and orders)

## Getting Started

### Store

```bash
git checkout feat/medusa-v2
cd store
npm i -g @antfu/ni
ni
echo "MEDUSA_ADMIN_ONBOARDING_TYPE=nextjs
STORE_CORS=http://localhost:8000,https://docs.medusajs.com
ADMIN_CORS=http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
AUTH_CORS=http://localhost:5173,http://localhost:9000,https://docs.medusajs.com
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
DB_NAME=medusa-store
DATABASE_URL=postgres://medusa:medusa@localhost/$DB_NAME
MEDUSA_ADMIN_ONBOARDING_NEXTJS_DIRECTORY=store-storefront" >> .env
docker compose up -d
nr dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENCE) file for details.

## Contact

For any inquiries, please contact info@chezscheyda.com.