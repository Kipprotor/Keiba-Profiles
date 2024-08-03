import { lookupIDGenerator } from "../src/index.ts";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const data = lookupIDGenerator({ motherName: "ダイワスカーレット" });
let page = 1;
while (true) {
  const result = await data.next();
  console.log("page: ", page);
  console.log(result);
  if (result.done) {
    break;
  }
  page += 1;
  await sleep(3000);
}

/*
for (let i = 0; i < 3; i++) {
  const data = lookupIDGenerator({horseName: "エクスカリバー"})
  console.log(i)
  for await (const result of data) {
    console.log(result);
  }
  await sleep(3000000)
}
*/
