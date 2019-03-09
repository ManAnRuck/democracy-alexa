import { HandlerInput } from "ask-sdk-core";
import { services } from "ask-sdk-model";
import SendDirectiveRequest = services.directive.SendDirectiveRequest;

const callDirectiveService = (handlerInput: HandlerInput): Promise<void> => {
  // Call Alexa Directive Service.
  const requestEnvelope = handlerInput.requestEnvelope;
  console.log(
    "handlerInput.serviceClientFactory",
    handlerInput.serviceClientFactory
  );
  const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();

  const requestId = requestEnvelope.request.requestId;

  // build the progressive response directive
  const directive: SendDirectiveRequest = {
    header: {
      requestId
    },
    directive: {
      type: "VoicePlayer.Speak",
      speech: "Einen kurzen augenblick bitte ich suche dir 3 der 709 heraus."
    }
  };
  // send directive
  return directiveServiceClient.enqueue(directive);
  //   return directiveServiceClient.enqueue(directive, endpoint, token);
};

export default callDirectiveService;
