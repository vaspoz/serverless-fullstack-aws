import { Bucket, Table } from "@serverless-stack/resources"

export const StorageStack = ({stack, app}) => {

    let bucket = new Bucket(stack, 'Uploads');

    let table = new Table(stack, 'NotesTable', {
        fields: {
            userId: 'string',
            noteId: 'string'
        },
        primaryIndex: {
            partitionKey: 'userId',
            sortKey: 'noteId'
        }
    });

    return {
        bucket,
        table
    }

}