'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.handler = async (event) => {
    console.log('Received event READ:', event);
    const postId = event.queryStringParameters.postId; // Assuming postId is passed as a path parameter
    // const postId = '3b297d7d-a517-4ba4-b735-399fa5271b61';
    const params = {
        TableName: 'BlogPosts',
        Key: {
            postId: postId,
        },
    };

    try {
        const data = await dynamoDb.get(params).promise();
        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Blog post not found' }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to read blog post', errorMessage: error }),
        };
    }
};
