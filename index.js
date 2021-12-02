exports.helloPubSub = (message, context) => {
  console.log('projectId: ',process.env.projectId);
  console.log('subscriptionName: ',process.env.subscriptionName);
  console.log('credentials: ',process.env.credentials);
  
 
  const name = message.data
    ? Buffer.from(message.data, 'base64').toString()
    : 'World';

  console.log(`Hello, ${name}!`);
};
