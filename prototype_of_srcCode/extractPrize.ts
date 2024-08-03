function extractPrize(prize: string): number[] {
  const prizeArray = prize.replace(/ |,/g, "").split("/");
  //console.log(prizeArray);
  let prizeJRA = 0;
  let prizeNAU = 0;

  for (const prize of prizeArray) {
    if (prize.includes("中央")) {
      prizeJRA = prizeNormalizer(prize);
    } else if (prize.includes("地方")) {
      prizeNAU = prizeNormalizer(prize);
    }
  }
  return [prizeJRA, prizeNAU];
}

function prizeNormalizer(prize: string): number {
  const regex = /[億万]/;
  const pSplited = prize.split(regex);
  if (pSplited.length == 3) {
    const result = parseInt(pSplited[0]) * 10 ** 4 + parseInt(pSplited[1]);
    return result;
  } else {
    return parseInt(pSplited[0]);
  }
}

const prize = "8,435万円 (中央) /1,208万円 (地方)";
const [prizeJRA, prizeNAU] = extractPrize(prize);
console.log({ prizeJRA, prizeNAU });
