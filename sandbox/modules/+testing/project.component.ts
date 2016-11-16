import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Logger } from '../common/service/log';
import { AppHelpers } from '../common/helpers/app';
import { Forge } from '../common/service/forge';
import { Kubernetes } from '../common/service/kubernetes';

import * as URI from 'urijs';
import * as _ from 'lodash';

@Component({
  selector: 'project',
  templateUrl: './project.html'
})

export class Project {

  teamId:string = undefined;
  projectId: string = undefined;

  constructor(private forge:Forge,
              private k8s:Kubernetes,
              private route:ActivatedRoute,
              private router:Router) {

  }

  ngOnInit() {
      var params = AppHelpers.allRouteParams(this.route);
      this.teamId = params['teamId'];
      this.projectId = params['projectId'];
      if (!this.teamId || !this.projectId) {
        return;
      }
  }

}
