import React, { Component } from 'react'
import NewsIteam from './NewsIteam'

export class News extends Component {


  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false
    }
  }
  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=4f77f28a5f0a4a11b9a8465af8197c8e";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles})
  }
  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top Heading</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsIteam title={ element.title? element.title.slice(0,40):""} description={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}




        </div>


      </div>
    )
  }
}

export default News

