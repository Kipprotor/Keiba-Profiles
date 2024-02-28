/* this is a test of type error

const turns = ["右", "左"] as const;
type Turn = typeof turns[number];

//type Turn = "  右" | "左";

let turn1:Turn = "上";
turn1 = "ght";
const turn: "migi" = "right";

console.log({foo,turn, typeof(turn), turn1,typeof(turn1)});

*/