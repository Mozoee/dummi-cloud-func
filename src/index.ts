import { Context } from "@google-cloud/functions-framework/build/src/functions";
import { PubsubMessage } from "@google-cloud/pubsub/build/src/publisher";
import { PubSub } from "@google-cloud/pubsub";
import moment from 'moment';

exports.readMessage = async (event: PubsubMessage, context: Context): Promise<void> => {
  // event.data can be Uint8Array|string|null, so need to cast it as string explicitly to allow base64 operations.
  const { projectId, subscriptionName, credentials } = process.env;
  console.log('env vars: ', projectId, subscriptionName, credentials);
  
  const pubSubClient = new PubSub({
    credentials: JSON.parse(
      Buffer.from(credentials!, "base64").toString()
    ),
    projectId: projectId,
  });

  const subscription = pubSubClient.subscription(subscriptionName!);
  const messages: { title: string; job: any; jobAttributes: any; ack: boolean; }[] = [];
  // Receive callbacks for new messages on the subscription
  subscription.on("message", async (message) => {
    let ack = false;
    console.log("print sub messages: ", message.data.toString());
    console.log(`Delivery Attempt: ${message.deliveryAttempt}`);
    console.log("Publish time: ", message.publishTime);
    console.log('current time: ', moment());
    var duration = moment.duration(moment().diff(message.publishTime));

    var aa = duration.asHours();
    console.log('difference in hrs: ', aa);

    if (Math.floor(Math.random() * 99999) % 2 === 0) {
      ack = true;
      message.ack();
    }
    console.log("acked?: ", ack);
    messages.push({
      title: "scheduler",
      job: message.data.toString(),
      jobAttributes: message.attributes,
      ack,
    });
  });
//   const message = event.data
//     ? Buffer.from(event.data as string, "base64").toString()
//     : "No Message";
   console.log(messages);

}
