import { profileByName } from "../src/index.ts";

const horseNames = ["パンサラッサ", "エクスカリバー"];
for (const horseName of horseNames) {
  const horseInfo = await profileByName({horseName});
  console.log(horseInfo);
}
