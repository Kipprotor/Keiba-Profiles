import * as crwlr from "../src/crawler.ts";


const url1 = crwlr.generateURL({horseName: "パンサラッサ"})
const url2 ="https://db.netkeiba.com/horse/2017106711/"
console.log("url:",url1,url2)

const res1 = await crwlr.fetchHtml(url1);
const res2 = await crwlr.fetchHtml(url2);

console.log("response:\n",{res1, res2 });

const res = await crwlr.fetchByID("2017106711");

console.log("res:",{ res })
