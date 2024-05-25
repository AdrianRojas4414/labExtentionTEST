import { AddedTestMetric } from "./addedTestMetric.js";
import { PercentageOfCoverageMetric } from "./percentageOfCoverageMetric.js";
import { ModifiedLinesMetric } from "./modifiedLinesMetric.js";

export class Commit {
    commitDescription = "";
    modifiedLines = 0;
    addedTests = 0;
    percentageOfCoverage = null;
    commitDate = null;
  
    constructor(commitDescription, modifiedLines, addedTests, percentageOfCoverage, commitDay, commitMonth, commitYear) {
      this.commitDescription = commitDescription;
      let linesValue = new ModifiedLinesMetric(modifiedLines);
      this.modifiedLines = linesValue;
      this.addedTests = new AddedTestMetric(addedTests, commitDescription)
      this.percentageOfCoverage = new PercentageOfCoverageMetric(percentageOfCoverage);
      this.commitDate = new Date(commitYear, commitMonth - 1, commitDay);
    }
  
    getCommitDescription() {
      return this.commitDescription;
    }
  
    getModifiedLines() {
      return this.modifiedLines;
    }
  
    getAddedTests() {
      return this.addedTests;
    }
  
    getPercentageOfCoverage() {
      return this.percentageOfCoverage;
    }

    getCommitDate() {
      return this.commitDate;
    }

    getCommitStringDate() {
      return this.commitDate.getDate() + "/" + (this.commitDate.getMonth() + 1) + "/" + this.commitDate.getFullYear();
    }
  
    getTotalPoints() {
      return this.modifiedLines.getPoints() + this.addedTests.getPoints() + this.percentageOfCoverage.getPoints();
    }
  }