import * as cheerio from 'npm:cheerio@1.0.0-rc.12';

//const html = '<div><a href="https://example.com/page1">Link 1</a><a href="https://example.com/page2">Link 2</a></div>';
const html = '<div><a href="https://example.com/page1">Link 1</a><a>Link 2</a></div>';

// cheerioでHTMLをロード
const $ = cheerio.load(html);

// a要素を選択し、mapを使って各要素のhref属性を配列に取得
const urlsArray: string[] = $('a').map((_, element) => $(element).attr('href')).get();
const textArray: string[] = $('a').map((_, element) => $(element).text()).get();
// 配列をコンソールに表示
console.log(urlsArray,textArray);
