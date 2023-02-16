(function () {
        const Answers = {
            optionsElement: null,
            questionTitleElement: null,
            currentQuestionIndex: 1,
            quiz: null,
            right: null,
            init() {
                const url = new URL(location.href);
                const testId = url.searchParams.get('testId');
                const results = url.searchParams.get('results').split(',');
                if (testId) {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://testologia.site/get-quiz?id=' + testId, false);
                    xhr.send();
                    if (xhr.status === 200 && xhr.responseText) {
                        this.quiz = JSON.parse(xhr.responseText);
                    }
                }
                if (testId) {
                    const xhr = new XMLHttpRequest();
                    xhr.open('GET', 'https://testologia.site/get-quiz-right?id=' + testId, false);
                    xhr.send();
                    if (xhr.status === 200 && xhr.responseText) {
                        this.right = JSON.parse(xhr.responseText);
                    }
                }
                this.showQuiz();
            },
            showQuiz() {
                document.getElementById('pre-title').innerText = this.quiz.name;
                this.optionsElement = document.getElementById('answers');

                const url = new URL(location.href);
                const results = url.searchParams.get('results').split(',');


                this.quiz.questions.forEach(question => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'answers-question-options';

                    this.questionTitleElement = document.createElement('h2');
                    this.questionTitleElement.className = 'answers-question-title';


                    this.questionTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ':</span> ' + question.question;
                    this.currentQuestionIndex++;
                    optionElement.appendChild(this.questionTitleElement);

                    question.answers.forEach(answer => {
                        const answerItem = document.createElement('div');
                        answerItem.className = 'answer-question-option';


                        const inputId = answer.id;

                        const inputElement = document.createElement('input');
                        inputElement.className = 'option-answer';
                        inputElement.setAttribute('id', inputId);
                        inputElement.setAttribute('type', 'radio');
                        inputElement.setAttribute('name', 'answer');
                        inputElement.setAttribute('value', answer.id);

                        const labelElement = document.createElement('label');
                        labelElement.setAttribute('for', inputId);
                        labelElement.innerText = answer.answer;

                        answerItem.appendChild(inputElement);
                        answerItem.appendChild(labelElement);
                        optionElement.appendChild(answerItem);
                    })

                    this.optionsElement.appendChild(optionElement);
                })

                const that = this;
                let optionElementsId = Array.from(document.getElementsByClassName('option-answer'));
                console.log(optionElementsId);
                optionElementsId.forEach(optionEl => {
                    that.right.forEach(right => {
                        const res = results.indexOf(String(right));
                        if (res !== -1 && String(optionEl.id) === String(right)) {
                            console.log(optionEl.id);
                            optionEl.parentElement.className = 'correct';
                        }
                        if (res === -1 && String(optionEl.id) === String(right)) {
                            console.log(optionEl.id);
                            optionEl.parentElement.className = 'wrong';
                        }
                    })

                });
            },
        }
        Answers.init();
    }
)
();