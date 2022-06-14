import { Template } from 'aws-cdk-lib/assertions';
import { App, getStack } from '@serverless-stack/resources';
import { StorageStack } from '../StorageStack';
import { test } from 'vitest';
import { BillingMode } from 'aws-cdk-lib/aws-dynamodb';

test("Test StorageStack", () => {
    
    const app = new App();
    // WHEN
    app.stack(StorageStack);
    // THEN
    const template = Template.fromStack(getStack(StorageStack));

    template.hasResourceProperties('AWS::DynamoDB::Table', {
        BillingMode: BillingMode.PAY_PER_REQUEST
    });
})