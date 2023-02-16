(function () {
    const Result = {
        init() {
            const url = new URL(location.href);
            document.getElementById('result-score').innerText = url.searchParams.get('score') + '/' + url.searchParams.get('total');

            document.getElementById('results').onclick = function () {
                location.href = 'answers.html?results=' + url.searchParams.get('results') + '&testId=' + url.searchParams.get('testId');
            };
        }
    }

    Result.init();
})();