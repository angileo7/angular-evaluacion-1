import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Configure the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Find and load all the tests
//const context = require.context('./', true, /\.spec\.ts$/);
//context.keys().map(context);
import './src/app/models/destinos-viajes-state.model.spec';