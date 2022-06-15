import { Bucket, Table } from "@serverless-stack/resources"
import { RemovalPolicy } from "aws-cdk-lib";

export const StorageStack = ({stack, app}) => {

    let bucket = new Bucket(stack, 'Uploads', {
        cdk: {
            bucket: {
                removalPolicy: RemovalPolicy.DESTROY
            }
        },
        cors: [{
            maxAge: '1 day',
            allowedOrigins: ['*'],
            allowedHeaders: ['*'],
            allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD']
        }]
    });

    let table = new Table(stack, 'NotesTable', {
        fields: {
            userId: 'string',
            noteId: 'string'
        },
        primaryIndex: {
            partitionKey: 'userId',
            sortKey: 'noteId'
        },
        cdk: {
            table: {
                removalPolicy: RemovalPolicy.DESTROY
            }
        }
    });

    return {
        bucket,
        table
    }

}