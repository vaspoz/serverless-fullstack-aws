import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export const ApiStack = ({ stack, app }) => {
  let { table } = use(StorageStack);

  let api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        },
      },
    },
    routes: {
      "POST /notes": "functions/create.main",
      "GET /notes/{id}": "functions/get.main",
      "GET /notes": "functions/list.main",
      "PUT /notes/{id}": "functions/update.main",
      "DELETE /notes/{id}": "functions/delete.main",
      "POST /billing": "functions/billing.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.customDomainUrl || api.url,
  });

  return {
    api,
  };
};
