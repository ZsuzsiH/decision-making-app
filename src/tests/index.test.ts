import {Intro} from './Intro/Intro';
import {Properties} from "./Properties/Properties";

beforeAll(async () => {
  await page.goto("http://localhost:3000", {waitUntil: "domcontentloaded"});
});
afterAll(async () => {
  await page.close();
});

describe('Testing intro step', () => {
  Intro()
})

describe('Testing properties stpe', () => {
  Properties()
})