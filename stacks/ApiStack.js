import { Api, use } from "@serverless-stack/resources"
import { StorageStack } from "./StorageStack"

export const ApiStack = ({stack, app}) => {

    let {table} = use(StorageStack);

    let api = new Api(stack, 'Api', {
        defaults: {
            function: {
                permissions: [table],
                environment: {
                    TABLE_NAME: table.tableName
                }
            }
        },
        routes: {
            "POST /notes": "functions/create.main",
            "GET /notes/{id}": "functions/get.main",
            "GET /notes": "functions/list.main",
        }
    });

    stack.addOutputs({
        ApiEndpoint: api.url
    });

    return {
        api
    }

}