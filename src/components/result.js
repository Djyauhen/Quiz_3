import {UrlManager} from "../utils/url-manager.js";

export class Result {
    constructor() {

        this.routeParams = UrlManager.getQueryParams();

        document.getElementById('result-score').innerText = this.routeParams.score + '/' + this.routeParams.total;

        const results = this.routeParams.results;
        const testId = this.routeParams.testId;

        document.getElementById('results-btn').onclick = function () {
            location.href = '#/answers?results=' + results + '&testId=' + testId;
        };
    }
}

