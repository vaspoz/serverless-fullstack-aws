import { Bucket, Table } from "@serverless-stack/resources"
import { RemovalPolicy } from "aws-cdk-lib";

export const StorageStack = ({stack, app}) => {

    let bucket = new Bucket(stack, 'Uploads', {
        removalPolicy: RemovalPolicy.DESTROY
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