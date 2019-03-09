import { RequestHandler, HandlerInput } from "ask-sdk-core";

const HelloWorldIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "HelloWorldIntent" ||
        handlerInput.requestEnvelope.request.intent.name === "hallo")
    );
  },
  handle(handlerInput: HandlerInput) {
    const speechText = "Hallo Bürger!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};

export default HelloWorldIntentHandler;
