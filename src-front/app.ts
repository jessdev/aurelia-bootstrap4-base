import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

export class App {
  router: Router | undefined;
  title: string;

  constructor(){
    this.title = "Website1";
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = this.title;
    // config.map([
    //   { route: ['', 'welcome'], name: 'welcome',      moduleId: PLATFORM.moduleName('./welcome'),      nav: true, title: 'Welcome' },
    //   { route: 'users',         name: 'users',        moduleId: PLATFORM.moduleName('./users'),        nav: true, title: 'Github Users' },
    //   { route: 'child-router',  name: 'child-router', moduleId: PLATFORM.moduleName('./child-router'), nav: true, title: 'Child Router' },
    // ]);
    config.map([
      { route: ['', 'home'], name: 'home',moduleId: PLATFORM.moduleName('./routes/home'), nav: true, title: 'Home' },
      { route: ['about'], name: 'about',moduleId: PLATFORM.moduleName('./routes/about'), nav: true, title: 'About' }
    ]);

    this.router = router;
  }
}
