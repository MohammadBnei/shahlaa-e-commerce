import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

module.exports = defineConfig({
  admin: {
    disable: process.env.ADMIN_ENABLED !== "true",
    backendUrl: process.env.BACKEND_URL,
    storefrontUrl: process.env.FRONTEND_URL || "http://localhost:8000",
    path: process.env.ADMIN_ENABLED ? "/app" : "/",
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    workerMode: process.env.MEDUSA_WORKER_MODE as
      | "shared"
      | "worker"
      | "server",
  },
  plugins: [
    {
      resolve: "medusa-plugin-smtp",
      options: {
        fromEmail: process.env.SMTP_SENDER_ADDRESS,
        transport: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secureConnection: true,
          auth: {
            user: process.env.SMTP_SENDER_ADDRESS,
            pass: process.env.SMTP_SENDER_PASS,
          },
          requireTLS: true,
        },
        emailTemplatePath: "data/emailTemplates",
        templateMap: {
          // "eventname": "templatename",
          "order.placed": "orderplaced",
          "customer.password_reset": "passwordreset",
        },
      },
    },
  ],
  modules: [
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/workflow-engine-redis",
      options: {
        redis: {
          url: process.env.REDIS_URL,
        },
      },
    },

    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            id: "stripe",
            resolve: "@medusajs/medusa/payment-stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
            },
          },
        ],
      },
    },

    // {
    //   resolve: "@medusajs/medusa/file",
    //   options: {
    //     providers: [
    //       {
    //         resolve: "@medusajs/medusa/file-s3",
    //         id: "s3",
    //         options: {
    //           file_url: process.env.S3_FILE_URL,
    //           access_key_id: process.env.S3_ACCESS_KEY_ID,
    //           secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
    //           region: process.env.S3_REGION,
    //           bucket: process.env.S3_BUCKET,
    //           endpoint: process.env.S3_ENDPOINT,
    //           additional_client_config: {
    //             forcePathStyle:
    //               process.env.S3_FORCE_PATH_STYLE === "true" ? true : undefined,
    //           },
    //         },
    //       },
    //     ],
    //   },
    // },
  ],
});
