import { RequestHandler, HandlerInput } from "ask-sdk-core";
import client from "../lib/initApollo";
import allMembers from "./allMembers";
import shuffle from "shuffle-array";
import allDeputies from "./query/allDeputies";
import callDirectiveService from "./DirectiveService";

const DeputiesIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "Bundestagsabgeordnete"
    );
  },
  handle: async (handlerInput: HandlerInput) => {
    try {
      // Call the progressive response service
      await callDirectiveService(handlerInput);
    } catch (err) {
      // if it failed we can continue, just the user will wait longer for first response
      console.log("error : " + err);
    }

    const deputiesResponse = await client.query({
      query: allDeputies
    });

    await new Promise(resolve => setTimeout(resolve, 5000));

    // const deputiesResponse = allMembers;

    console.log("deputies", deputiesResponse.data.deputies);

    const deputies = deputiesResponse.data.deputies.map(
      ({ name, party }: { name: string; party: string }) => ({
        name,
        party
      })
    );

    shuffle(deputies);

    const deputiesData = deputies.reduce(
      (
        prev: { content: string; sum: number; last: boolean },
        { name, party }: { name: string; party: string }
      ) => {
        if (prev.sum < 2) {
          return {
            ...prev,
            content: `${prev.content}, ${name} für die Fraktion ${party}`,
            sum: prev.sum + 1
          };
        } else if (!prev.last) {
          return {
            ...prev,
            content: `${prev.content} und ${name} für die Fraktion ${party}`,
            sum: prev.sum + 1,
            last: true
          };
        }
        return prev;
      },
      {
        content: "",
        sum: 0,
        last: false
      }
    );

    const speechText = `Im Bundestag arbeiten unter anderem diese ${
      deputiesData.sum
    } Abgeordneten: ${deputiesData.content}`;

    console.log(speechText);

    // const speechText = "Ha ha arbeiten tut da niemand!";

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  }
};

export default DeputiesIntentHandler;
