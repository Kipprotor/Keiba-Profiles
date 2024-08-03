import { fetchByID, searchOnNetkeiba } from "./crawler.ts";

import {
  lookupID,
  lookupIDGenerator,
  profileByID,
  profileByName,
} from "./wrapper.ts";

import {
  scrapeHorseInfo,
  scrapeHorseTitle,
  scrapePedigree,
  scrapeProfTable,
  scrapeSearchResult,
  scrapeRaceResult
} from "./scrape/scraper.ts";

export {
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
  scrapeRaceResult,
  searchOnNetkeiba,
};
