import React, { Component } from 'react'
import NewsItem from './newsitem'
import Spinner from './Spinner';
import PropTypes from  'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class Newscomponent extends Component {


  static defaultProps= {
      country:'in',
      pageSize:8,
      category:'general'
    }
  
    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
    }
    capitalizeFirstLetter = (category)=>{
      return String(category).charAt(0).toUpperCase() + String(category).slice(1);
    }
    
    constructor(props){
        super(props);
        this.state={
            articles: [],
            loading:true,
            page:1,
            totalResults:0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - Monkey news`;
    }


async  updateNews(){
  this.props.setProgress(0);
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=240154ce9a20412a995fa6f72768fbf7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parseData = await data.json();
  this.setState({articles:parseData.articles, 
    totalResults:parseData.totalResults,
    loading:false
  });
  this.props.setProgress(100);

}

async componentDidMount(){
 this.updateNews();
}

NextButt = async ()=>{
  if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
  {
      this.setState({page: this.state.page + 1});
      this.updateNews();
  }
}

PreviousButt = async ()=>{
    this.setState({page: this.state.page - 1});
    this.updateNews();
}

fetchMoreData = async () => {
  const nextPage = this.state.page + 1;

  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=240154ce9a20412a995fa6f72768fbf7&page=${nextPage}&pageSize=${this.props.pageSize}`;

  let data = await fetch(url);
  let parseData = await data.json();
  if (parseData.articles.length === 0) {
    this.setState({ totalResults: this.state.articles.length });
    return;
  }

  this.setState((prevState) => ({
    page: nextPage,
    articles: prevState.articles.concat(parseData.articles),
  }));
};



  render() {
    return (
      <>
       {!this.state.loading && this.state.articles.length === 0 && (
  <h4 className="text-center text-muted">No news available for this category</h4>
)}
        {this.state.loading && <Spinner/>}


        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length < this.state.totalResults} loader={<Spinner />}>
        <div className='container'>
          <div className='row' style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',rowGap:'30px'}}>
            {this.state.articles.map((element)=>{
              return <div key={element.url} className='container'>
                            <NewsItem title={element.title?element.title:""} id={element.source.id?element.source.id:"unknown-source"} Date={element.publishedAt} author={element.author} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://images.unsplash.com/photo-1521295121783-8a321d551ad2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ybGQlMjBuZXdzfGVufDB8fDB8fHww"} newsUrl={element.url} />
                    </div>
            })}
          </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default Newscomponent
