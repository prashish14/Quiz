import React, { Component } from 'react';
import './App.css';
import Header from '../src/components/Header';
import QuizQuestion from '../src/components/QuizQuestion';
import SmartComponent from '../src/components/SmartComponent';
import DumbComponent from '../src/components/DumbComponent';
import {data} from '../src/data/questions';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentQuestionId: 1,
            questionList: props.questionData.map(d => {
                return {
                    id: d.id,
                    points: 0
                }
            })
        }
    }

      TotalScoreofUser(){
      const {questionList} = this.state;
      let total = 0;
      questionList.forEach(q => {total += parseInt(q.points)});
      return total;
    }

      isEndOfTest(){
      const {currentQuestionId, questionList} = this.state;
      return currentQuestionId > questionList.length;
    }


    reload(){
      window.location.reload()
    }


      OnClickAnswers(pt){
        console.log('pt', pt);
        const {currentQuestionId, questionList} = this.state;
        this.setState({
            currentQuestionId: currentQuestionId + 1,
            questionList: questionList.reduce((acc, q) => {
            if(q.id === currentQuestionId){
                q.points = pt;
            }
            acc = acc.concat([q]);
            return acc;
            }, [])
        })
    }

    ExtractClassName(){
        const {currentQuestionId, questionList} = this.state;
      const isEndOfTest = currentQuestionId > questionList.length
      return isEndOfTest? "green": "red";
    }

    ExtractAnswers(){
        const {questionData} = this.props;
        const {currentQuestionId, questionList} = this.state;
        const isEndOfTest = currentQuestionId > questionList.length
        return !isEndOfTest ?
            questionData.find(qd => qd.id === currentQuestionId).answers : [];
    }

    

    goBack(){
        const {currentQuestionId} = this.state;
            if(currentQuestionId > 1){
                this.setState({
                    currentQuestionId: currentQuestionId - 1
                })
            }
    }
    
    findContentofQuestions(){
        const {questionData} = this.props;
        const {currentQuestionId, questionList} = this.state;
        const isEndOfTest = currentQuestionId > questionList.length ? true : false;
        let total = 0;
        questionList.forEach(q => {total += parseInt(q.points)});
        const question = !isEndOfTest ?
            questionData.find(qd => qd.id === currentQuestionId) :
            [];

        return {title: question.title, content: question.content};
    }

    render() {
        console.log('this.state', this.state);
        const {currentQuestionId, questionList} = this.state;
        const isEndOfTest = currentQuestionId > questionList.length ? true : false;
        return (
        <div className="App">
            <Header isEnd={this.isEndOfTest.bind(this)} handleGoBack={() => this.goBack()}/>
            <div className="quiz">
              <QuizQuestion isEnd={this.isEndOfTest.bind(this)} className={this. ExtractClassName()}
                 question={this.findContentofQuestions()} isEndOfTest={isEndOfTest} />
              <SmartComponent  answers ={this.  ExtractAnswers()}
                 OnClickAnswers={(id) => this.OnClickAnswers(id)}/>
              <DumbComponent isEnd={this.isEndOfTest.bind(this)}
                reload={this.reload.bind(this)} score={this.TotalScoreofUser.bind(this)} />
            </div>
        </div>
        );
    }
}

export default App;
App.defaultProps = data;