'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.handler = async (event) => {
    console.log('Received event:', event);
    const requestBody = event.body;
    // const requestBody = {'title' : 'hello', 'content' : 'hello', 'userId' : 'hello'}
    const title = requestBody.title;
    const content = requestBody.content;
    const userId = requestBody.userId; // Assume a user ID is provided

    const params = {
        TableName: 'BlogPosts',
        Item: {
            postId: uuid.v4(),
            title: title,
            content: content,
            userId: userId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Blog post created successfully', postId: params.Item.postId }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to create blog post', errorMessage: error }),
        };
    }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
