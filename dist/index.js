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
Object.defineProperty(exports, "__esModule", { value: true });
// import { PubSub } from "@google-cloud/pubsub";
exports.readMessage = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    // event.data can be Uint8Array|string|null, so need to cast it as string explicitly to allow base64 operations.
    console.log('env vars: ', process.env.projectId, process.env.subscriptionName, process.env.credentials);
    const message = event.data
        ? Buffer.from(event.data, "base64").toString()
        : "No Message";
    console.log(message);
});
