// import { PubSub } from "@google-cloud/pubsub";
exports.readMessage = async (event, context) => {
    // event.data can be Uint8Array|string|null, so need to cast it as string explicitly to allow base64 operations.
    console.log('env vars: ', process.env.projectId, process.env.subscriptionName, process.env.credentials);
    const message = event.data
        ? Buffer.from(event.data, "base64").toString()
        : "No Message";
    console.log(message);
};
export {};
