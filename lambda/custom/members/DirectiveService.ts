import { HandlerInput } from "ask-sdk-core";
import { services } from "ask-sdk-model";
import SendDirectiveRequest = services.directive.SendDirectiveRequest;

const callDirectiveService = (handlerInput: HandlerInput): Promise<void> => {
  // Call Alexa Directive Service.
  const requestEnvelope = handlerInput.requestEnvelope;
  const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();

  const requestId = requestEnvelope.request.requestId;
  const endpoint = requestEnvelope.context.System.apiEndpoint;
  const token = requestEnvelope.context.System.apiAccessToken;

  // build the progressive response directive
  const directive: SendDirectiveRequest = {
    header: {
      requestId
    },
    directive: {
      type: "VoicePlayer.Speak",
      speech:
        "Space is a bit far way. Wait till I get back the information from ISS."
    }
  };
  // send directive
  return directiveServiceClient.enqueue(directive);
  //   return directiveServiceClient.enqueue(directive, endpoint, token);
};

export default callDirectiveService;
