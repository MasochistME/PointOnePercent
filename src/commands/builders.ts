import { badgecreateBuilder } from "./badgecreate/builder";
import { badgedeleteBuilder } from "./badgedelete/builder";
import { badgeeditBuilder } from "./badgeedit/builder";
import { badgegiveBuilder } from "./badgegive/builder";
import { badgerevokeBuilder } from "./badgerevoke/builder";
// import { memeBuilder } from "./meme/builder";
import { memeaddBuilder } from "./memeadd/builder";
import { memedeleteBuilder } from "./memedelete/builder";
// import { memelistBuilder } from "./memelist/builder";
// import { profileBuilder } from "./profile/builder";
import { racesetupBuilder } from "./racesetup/builder";
import { registerBuilder } from "./register/builder";
// import { updateBuilder } from "./update/builder";
import { vidBuilder } from "./vid/builder";
import { setdescriptionBuilder } from "./setdescription/builder";

export const customCommands = [
  badgecreateBuilder,
  badgedeleteBuilder,
  badgeeditBuilder,
  badgegiveBuilder,
  badgerevokeBuilder,
  // memeBuilder,
  memeaddBuilder,
  memedeleteBuilder,
  // memelistBuilder,
  // profileBuilder,
  racesetupBuilder,
  registerBuilder,
  // updateBuilder,
  vidBuilder,
  setdescriptionBuilder,
];
