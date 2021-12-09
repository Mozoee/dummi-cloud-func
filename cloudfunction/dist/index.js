"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pubsub_1 = require("@google-cloud/pubsub");
const moment_1 = __importDefault(require("moment"));
exports.readMessage = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    // event.data can be Uint8Array|string|null, so need to cast it as string explicitly to allow base64 operations.
    const { projectId, subscriptionName, credentials } = process.env;
    console.log('env vars: ', projectId, subscriptionName, credentials);
    const pubSubClient = new pubsub_1.PubSub({
        credentials: JSON.parse(Buffer.from(credentials, "base64").toString()),
        projectId: projectId,
    });
    const subscription = pubSubClient.subscription(subscriptionName);
    const messages = [];
    // Receive callbacks for new messages on the subscription
    subscription.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        let ack = false;
        console.log("print sub messages: ", message.data.toString());
        console.log(`Delivery Attempt: ${message.deliveryAttempt}`);
        console.log("Publish time: ", message.publishTime);
        console.log('current time: ', moment_1.default());
        var duration = moment_1.default.duration(moment_1.default().diff(message.publishTime));
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
    }));
    //   const message = event.data
    //     ? Buffer.from(event.data as string, "base64").toString()
    //     : "No Message";
    // Create an event handler to handle errors
    const errorHandler = function (error) {
        // Do something with the error
        console.error(`ERROR: ${error}`);
        throw error;
    };
    subscription.on("error", errorHandler);
    setTimeout(() => {
        console.log("Final output");
        console.log({ messageReceived: messages });
        // res.status(200).json({ messageReceived: messages });
    }, 10 * 1000);
    //    console.log(messages);
});
