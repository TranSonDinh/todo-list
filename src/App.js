import React, { Component } from 'react';
import './App.css';
import TodoItems from './components/TodoItems.js';
import tick from './img/tick.svg';

class App extends Component  {
  constructor() {
    super();
    this.state = {
      chon : 0,
      todoItems : [
        {title : 'Đi chơi' , isComplete : false},
        {title : 'Đi học' , isComplete : false},
        {title : 'Chơi game' , isComplete : false},
      ]
    };
    this.clickItem = this.clickItem.bind(this);
    this.allSelect = this.allSelect.bind(this);
    this.clickAddItem = this.clickAddItem.bind(this);
    this.clickAll = this.clickAll.bind(this);
    this.clickActive = this.clickActive.bind(this);
    this.clickComplete = this.clickComplete.bind(this);
  }
  clickItem(items){
    return () => {
      const isComplete = items.isComplete;
      const {todoItems} = this.state;
      const index = todoItems.indexOf(items);
      this.setState({
        todoItems : [
          ...todoItems.slice(0,index),
          {
            ...items,
            isComplete : !isComplete
          },
          ...todoItems.slice(index+1)
        ]
      });
    };
  }
  allSelect(){
    const {todoItems} = this.state;
    this.setState({
      todoItems: todoItems.map(el => el !== '' ?{
          ...el,
          isComplete : !el.isComplete
        }:el)
    })
  }
  clickAddItem(event){
    if(event.keyCode===13){
      let text = event.target.value;
      if(!text) return;
      text = text.trim();
      if(!text) return;
      this.setState({
        todoItems : [
          ...this.state.todoItems,
          {
            title : text,
            isComplete :false
          }
        ]
      })
      event.target.value = '';
    }
  }
  clickCancel(item){
    return () => {
      const {todoItems} = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems : [
          ...todoItems.splice(0,index),
          ...todoItems.splice(index+1)
        ]
      });
    }

  }
  clickAll(){
    const {todoItems} = this.state;
    this.setState({
      chon : 0,
      todoItems :[
        ...todoItems
      ]
    });
  }
  clickActive(){
    const {todoItems} = this.state;
    this.setState({
      chon : 1,
      todoItems :[
        ...todoItems
      ]
    });
  }
  clickComplete(){
    const {todoItems} = this.state;
    this.setState({
      chon : 2,
      todoItems :[
        ...todoItems
      ]
    });
  }
  render() {
    const {todoItems,chon} = this.state;
    let Act = [];
    let Comp = [];
    let arr = [];
    let total = todoItems.length;
    todoItems.map((x) => {
      if(x.isComplete===false)
        Act.push(x);
      if(x.isComplete===true)
        Comp.push(x)
    });
    if(chon === 1){
      arr = [...Act];
      total = arr.length;
    }
    else if(chon === 2)
    {
      arr = [...Comp];
      total = arr.length;
    }
    else arr = [...todoItems];
    return (
        <div className="App">
          <div className="Header">
            <img src={tick} height={25} width={25} onClick={this.allSelect}/>
            <input type="text" placeholder="Add Items..." onKeyDown={this.clickAddItem}/>
          </div>
            {
              arr.map((x,index) =>
                <TodoItems key={index} chon={chon} item = {x} onClick={this.clickItem(x)} clickCancel={this.clickCancel(x)}/>
              )
            }
          <div>
            <p className='totalItems'>{total} items</p>
            <div className='classify'>
              <button onClick={this.clickAll}>All</button>
              <button onClick={this.clickActive}>Active</button>
              <button onClick={this.clickComplete}>Complete</button>
            </div>
          </div>
        </div>
    );
  }
}
export default App;
