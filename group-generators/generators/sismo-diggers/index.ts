import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationFrequency, GroupGenerator } from "topics/group-generator";
import { dataProviders } from "@group-generators/helpers/providers";
import { GenerationContext } from "topics/generation-context";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Daily;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    // This group is constituted by all the users who have a sismo poap
    // of the following event:

    const poapProvider = new dataProviders.PoapSubgraphProvider();

    const zikiPoapOwners = await poapProvider.queryEventsTokenOwners({
      eventIds: [
        37527 /* Ziki Testers */, 39515 /* Ziki Artists */,
        39651 /* Ziki Community Managers  */, 39654 /* Ziki Data Analysts */,
        39655 /* Ziki copywriters */, 39657 /* Ziki cryptographers */,
        39660 /* Ziki Data creators */,
      ],
    });

    return [
      {
        name: "sismo-diggers",
        timestamp: context.timestamp,
        data: zikiPoapOwners,
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.User],
      },
    ];
  }
}
