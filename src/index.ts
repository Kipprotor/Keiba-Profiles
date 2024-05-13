import { fetchByID, searchOnNetkeiba } from "./crawler.ts";

import {
  lookupID,
  lookupIDGenerator,
  profileByID,
  profileByName,
} from "./wrapper.ts";

import {
  extractPrize,
  scrapeHorseInfo,
  scrapeHorseTitle,
  scrapePedigree,
  scrapeProfTable,
  scrapeSearchResult,
} from "./scrape/scraper.ts";

export {
  extractPrize,
  fetchByID,
  lookupID,
  lookupIDGenerator,
  profileByID,
  profileByName,
  scrapeHorseInfo,
  scrapeHorseTitle,
  scrapePedigree,
  scrapeProfTable,
  scrapeSearchResult,
  searchOnNetkeiba,
};
