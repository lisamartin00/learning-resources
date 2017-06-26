import * as angular from 'angular';

import {App} from './app/containers/App';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .component('app', App)

