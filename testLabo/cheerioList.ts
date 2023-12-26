import * as cheerio from 'npm:cheerio@1.0.0-rc.12';

const html = '<div><p class="bml txt_l">Paragraph 1</p><p class="txt_c">Paragraph 2</p><p class="txt_c">Paragraph 3</p></div>';

// cheerioでHTMLをロード
const $ = cheerio.load(html);

// p要素を選択し、mapを使って各要素のclass属性を配列に取得
const classesArray: string[] = $('p').map((_, element) => $(element).attr('class') || '').get();

// 配列をコンソールに表示
console.log(classesArray);
