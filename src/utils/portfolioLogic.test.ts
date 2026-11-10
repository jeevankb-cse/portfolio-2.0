import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PROJECTS_DATA,
  ROAD_JOURNEY_STOPS,
  SKILLS_DATA,
} from '../data/portfolioData';
import {
  buildMailtoHref,
  calculateRoadProgressPercentage,
  filterProjects,
  filterRoadStops,
  filterSkills,
  validateContactForm,
} from './portfolioLogic';

test('filterProjects returns all 4 projects when category is All Works and query is empty', () => {
  const result = filterProjects(PROJECTS_DATA, 'All Works', '');
  assert.equal(result.length, 4);
});

test('filterProjects filters accurately by category and search query', () => {
  const cvProjects = filterProjects(PROJECTS_DATA, 'Computer Vision', '');
  assert.equal(cvProjects.length, 1);
  assert.equal(cvProjects[0].id, 'smart-voting-system');

  const ocrSearch = filterProjects(PROJECTS_DATA, 'All Works', 'tesseract');
  assert.equal(ocrSearch.length, 1);
  assert.equal(ocrSearch[0].id, 'scamshield-ai');

  const sihSearch = filterProjects(PROJECTS_DATA, 'All Works', 'PS 26068');
  assert.equal(sihSearch.length, 1);
  assert.equal(sihSearch[0].id, 'weathergpt');
});

test('filterSkills filters skills by domain and project cross-reference', () => {
  const mlSkills = filterSkills(SKILLS_DATA, 'AI & Machine Learning');
  assert.equal(mlSkills.length, 5);

  const opencvSkills = filterSkills(SKILLS_DATA, 'All Domains', 'OpenCV');
  assert.equal(opencvSkills.length, 1);
  assert.equal(opencvSkills[0].name, 'OpenCV');
});

test('filterRoadStops and calculateRoadProgressPercentage compute road travel progress accurately', () => {
  const allStops = filterRoadStops(ROAD_JOURNEY_STOPS, 'all');
  assert.equal(allStops.length, 4);

  const expStops = filterRoadStops(ROAD_JOURNEY_STOPS, 'experience');
  assert.equal(expStops.length, 1);
  assert.equal(expStops[0].city, 'Vijayanagar, Bengaluru');

  const eduStops = filterRoadStops(ROAD_JOURNEY_STOPS, 'education');
  assert.equal(eduStops.length, 3);

  assert.equal(calculateRoadProgressPercentage(0, 4), 25);
  assert.equal(calculateRoadProgressPercentage(1, 4), 50);
  assert.equal(calculateRoadProgressPercentage(2, 4), 75);
  assert.equal(calculateRoadProgressPercentage(3, 4), 100);
});

test('validateContactForm rejects empty or invalid inputs and accepts valid data', () => {
  const emptyCheck = validateContactForm({
    name: '',
    email: 'invalid-email',
    subject: '',
    message: 'short',
  });
  assert.equal(emptyCheck.valid, false);
  assert.ok(emptyCheck.errors.name);
  assert.ok(emptyCheck.errors.email);
  assert.ok(emptyCheck.errors.subject);
  assert.ok(emptyCheck.errors.message);

  const validCheck = validateContactForm({
    name: 'Ananya Rao',
    email: 'ananya@techcorp.in',
    subject: 'AI Engineer Opportunity — Bengaluru',
    message: 'Hi Jeevan, we reviewed ScamShield AI and would love to schedule an interview.',
  });
  assert.equal(validCheck.valid, true);
  assert.deepEqual(validCheck.errors, {});
});

test('buildMailtoHref encodes subject and body accurately', () => {
  const href = buildMailtoHref('jeevankenchalli514@gmail.com', {
    name: 'Ananya Rao',
    email: 'ananya@techcorp.in',
    subject: 'AI Role',
    message: 'Let us connect regarding AI engineering.',
  });
  assert.ok(href.startsWith('mailto:jeevankenchalli514@gmail.com?subject='));
  assert.ok(href.includes('Ananya%20Rao'));
});
