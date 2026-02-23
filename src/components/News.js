import React,{useEffect ,useState} from 'react'
import NewsItem from './newsitem'
import Spinner from './Spinner';
import PropTypes from  'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const Newscomponent = ({
  country = 'in',
  pageSize = 8,
  category = 'general',
  setProgress
}) =>{
    const [articles,setArticles] = useState([])
    const [loading,setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalResults,setTotalResult] = useState(0)
 
const capitalizeFirstLetter = (category)=>{
      return String(category).charAt(0).toUpperCase() + String(category).slice(1);
    }

const updateNews= async()=>{
  setProgress(0);
  let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=240154ce9a20412a995fa6f72768fbf7&page=${page}&pageSize=${pageSize}`;
  setLoading(true);
  let data = await fetch(url);
  let parseData = await data.json();
  setArticles(parseData.articles);
  setTotalResult(parseData.totalResults)
  setLoading(false) 
  setProgress(100);

}  

useEffect(()=>{
  updateNews();
},[])


const NextButt = async ()=>{
  if(!(page+1 > Math.ceil(totalResults/pageSize)))
  {
      setPage(page-1);
      updateNews();
  }
}

const PreviousButt = async ()=>{
    setPage(page+1);
    updateNews();
}

const fetchMoreData = async () => {
  
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=240154ce9a20412a995fa6f72768fbf7&page=${page+1}&pageSize=${pageSize}`;
  setPage(page+1);
  let data = await fetch(url);
  let parseData = await data.json();
  setArticles(articles.concat(parseData.articles));
  setTotalResult(parseData.totalResults);
};



    return (
      <>
        <h1 className='text-center' style={{margin:'60px 0px'}}>NewsMonkey - Top{capitalizeFirstLetter(category)} HeadLines</h1>
        {loading && <Spinner/>}


        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length < totalResults} loader={<Spinner />}>
        <div className='container'>
          <div className='row' style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',rowGap:'30px'}}>
            {articles.map((element)=>{
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


Newscomponent.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default Newscomponent
