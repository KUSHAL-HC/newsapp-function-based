import React from 'react'


const NewsItem = (props) =>{

    let {title,description,imageUrl,newsUrl,author,Date,id}= props;
   return(
    <div className='my-3'>
        <div className='card'>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'85%',zIndex:'1'}}>{id}<span className="visually-hidden">unread messages</span></span>
            <img src={imageUrl?imageUrl:"https://images.unsplash.com/photo-1521295121783-8a321d551ad2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29ybGQlMjBuZXdzfGVufDB8fDB8fHww"} className='card-img-top' alt="..."/>
            <div className='card-body'>
                <h5 className='card-title' style={{display:'-webkit-box',WebkitLineClamp:'2',WebkitBoxOrient:'vertical',overflow:'hidden'}}>{title}</h5>
                <p className='card-text' style={{height:'100px',display:'-webkit-box',WebkitLineClamp:'4',WebkitBoxOrient:'vertical',overflow:'hidden'}}>{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author},Last updated on {Date}</small></p>
                <a rel="noreferrer" href={newsUrl} className='btn btn-sm btn-dark'>Read More</a>
            </div>
        </div>
    </div>
   )
  
}

export default NewsItem
