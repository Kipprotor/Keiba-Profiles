import { default as iconv } from "npm:iconv-lite@0.6.3";
import * as cheerio from "npm:cheerio@1.0.0-rc.12";
import {
  createTableParser,
  RowData,
  TableParserFactory,
} from "npm:parse-html-table";

//console.log(iconv);
//console.log(cheerio);
export { cheerio, createTableParser, iconv };
export type { RowData, TableParserFactory };
