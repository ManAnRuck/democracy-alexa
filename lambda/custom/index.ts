import { SkillBuilders, DefaultApiClient } from "ask-sdk-core";
import HelloWorldIntentHandler from "./Handlers/HelloWorldIntentHandler";
import HelpIntentHandler from "./Handlers/HelpIntentHandler";
import CancelAndStopIntentHandler from "./Handlers/CancelAndStopIntentHandler";
import LaunchRequestHandler from "./Handlers/LaunchRequestHandler";
import SessionEndedRequestHandler from "./Handlers/SessionEndedRequestHandler";
import ErrorHandler from "./Handlers/ErrorHandler";
import DeputiesIntentHandler from "./Handlers/SomeDeputiesIntendHandler/DeputiesIntentHandler";

const skillBuilder = SkillBuilders.custom();

const handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    DeputiesIntentHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new DefaultApiClient())
  .lambda();

export { handler };
