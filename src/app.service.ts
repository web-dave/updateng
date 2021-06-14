import { Injectable } from '@nestjs/common';
import { db } from './db';

export interface VERSION {
  name: string;
  number: number;
}
export interface RECOMMENDATION {
  possibleIn: number;
  necessaryAsOf: number;
  level: number;
  step: string;
  action: string;
}

@Injectable()
export class AppService {
  steps = db.RECOMMENDATIONS;
  versions = db.versions;

  getHello(): string {
    return 'Hello World!';
  }
  createUpdatePath(
    start: string,
    target: string,
  ): { [key: string]: RECOMMENDATION[] } | string {
    const from = this.getVersion(start);
    const to = this.getVersion(target);
    const beforeRecommendations: RECOMMENDATION[] = [];
    const duringRecommendations: RECOMMENDATION[] = [];
    const afterRecommendations: RECOMMENDATION[] = [];

    if (to.number < from.number) {
      return 'We do not support downgrading versions of Angular.';
    }
    // Find applicable steps and organize them into before, during, and after upgrade
    for (const step of this.steps) {
      if (step.level <= 3 && step.necessaryAsOf > from.number) {
        // Check Options
        // Only show steps that don't have a required option
        // Or when the user has a matching option selected
        // let skip = false;
        // for (const option of this.optionList) {
        //   if (step[option.id] && !this.options[option.id]) {
        //     skip = true;
        //   }
        // }
        // if (skip) {
        //   continue;
        // }

        // If you could do it before now, but didn't have to finish it before now
        if (
          step.possibleIn <= from.number &&
          step.necessaryAsOf >= from.number
        ) {
          beforeRecommendations.push(step);
          // If you couldn't do it before now, and you must do it now
        } else if (
          step.possibleIn > from.number &&
          step.necessaryAsOf <= to.number
        ) {
          duringRecommendations.push(step);
        } else if (step.possibleIn <= to.number) {
          afterRecommendations.push(step);
        } else {
        }
      }
    }
    return {
      beforeRecommendations,
      duringRecommendations,
      afterRecommendations,
    };
  }
  getVersions(): string[] {
    return this.versions.map((obj) => obj.name);
  }
  private getVersion(newVersion: string): VERSION {
    // falschangaben abfangen
    // falsche versionen find best match
    return this.versions.find((version) => version.name === newVersion);
  }
}
