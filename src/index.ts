import { Context } from "@google-cloud/functions-framework/build/src/functions";
import { PubsubMessage } from "@google-cloud/pubsub/build/src/publisher";
// import { PubSub } from "@google-cloud/pubsub";

exports.readMessage = async (event: PubsubMessage, context: Context): Promise<void> => {
  // event.data can be Uint8Array|string|null, so need to cast it as string explicitly to allow base64 operations.
  console.log('env vars: ', process.env.projectId, process.env.subscriptionName, process.env.credentials)
  const message = event.data
    ? Buffer.from(event.data as string, "base64").toString()
    : "No Message";
  console.log(message);

}
