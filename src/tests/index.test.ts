import {Intro} from './Intro/Intro';
import {Properties} from "./Properties/Properties";
import {Options} from "./Options/Options";
import {Result} from "./Result/Result";

beforeAll(async () => {
  await page.goto("http://localhost:3000", {waitUntil: "domcontentloaded"});
});
afterAll(async () => {
  await page.close();
});

describe('Testing intro step', () => {
  Intro();
});

describe('Testing properties step', () => {
  Properties();
});

describe('Testing options step', () => {
  Options();
})

describe('Testing data on result page', () => {
  Result();
})