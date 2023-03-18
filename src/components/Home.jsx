import React, { useState } from 'react';
import data from '../data.json';
import '../App.css'
const Home = () => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [article,setArticle] = useState([])
    const [thread,setThread] = useState([])
    
    const [toggleSeemore,setToggleSeemore] = useState([])
    const [toggle,setToggle] = useState(null)
    const [toggleThread,setToggleThread] = useState(null)

   
    
    const displayList = (data,title)=>{
        if(data){
            return(data.filter((item)=> {return item.asset.asset_title === title})
                        .map((item,index)=>(
                <div className='toggle-feature' key={index}>
                    <button type='button' 
                            onClick={()=>{
                                setToggle((prev)=>
                                    prev === index ? null : index)
                                }}
                            className='toggle-heading'>
                        <i className={toggle === index ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></i> &nbsp;{item.title}
                    </button> 
                    {toggle === index ?
                    <div className='toggle-body'>
                        <p className='toggle-content'>
                            {item.content}
                        </p>
                        {toggleSeemore === index ? 
                            <p className='toggle-content'>
                                <br/>
                                {item.summary}
                            </p>
                        :
                        <></>
                        }
                        <button onClick={()=>{
                            setToggleSeemore((prev)=>
                            prev === index ? null : index)
                        }} 
                        type='button' 
                                className='see-more'>
                                See More
                        </button>
                    </div> 
                    :
                    <></>
                    } 
                </div>
                ))
            )
        }
    }
    const handleSubmit = (e,asset)=>{
        e.preventDefault();
        let data = [];
        if(asset.asset_content_type === 'article' ){
            data = {
                asset:asset,
                title:e.target.title.value, 
                content:e.target.content.value, 
            }
            console.log(data)
            setArticle(article.concat(data))
        }
        else if (asset.asset_content_type === 'threadbuilder'){
            data = {
                asset:asset,
                title:e.target.thread.value, 
                content:e.target.interpretation.value,
                summary:e.target.summary.value
            }
            console.log(data)
            setThread(thread.concat(data))
        }
    }

  return (
    <React.Fragment>
        <section className="home">
        <div className="heading">
            <h1>{data.title}</h1>
            <button className="submit-task" >Submit task</button>
        </div>
        <div className="description">
            <h2>{data.tasks[0].task_title}</h2>
            <p>{data.tasks[0].task_description}</p>
        </div>
        <div className="asset-container">
        {data.tasks[0].assets.map((asset)=>(
            <div className="asset" key={asset.asset_id}>
                <div className="asset-header">
                    <h4>{asset.asset_title}</h4>
                    <button className="info-button">i</button>
                </div>
                <div className="asset-body">
                    <div className="asset-desc">
                        <span>Description : </span>
                        {asset.asset_description}    
                    </div>
                    <div className='asset-details'>
                        {asset.asset_content_type === 'video' ? 
                            <iframe className='video'
                                title='Youtube player'
                                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                src={asset.asset_content}
                            >
                            </iframe>
                        : <></>}
                        {asset.asset_content_type === 'article' ? 
                            <div className='article-body'>
                                <form onSubmit={
                                    (e)=>handleSubmit(e,asset)
                                    }>
                                    <div className='article-list'>
                                        {displayList(article,asset.asset_title)}
                                    </div>
                                    <div className='article-heading'>
                                        <h4>Title</h4>
                                        <input className='article-title-input' type="text" name='title'  required/>
                                    </div>
                                    <div className='article-content'>
                                        <h4>Content</h4>
                                        <input className='article-content-input' type="text" name='content'  required/>
                                    </div>
                                    <button className='submit-article'>Submit</button>
                                </form>
                            </div>
                        : <></> 
                        }
                        {asset.asset_content_type === 'threadbuilder' ? 
                            <div className='thread-body'>
                                <form onSubmit={
                                    (e)=>handleSubmit(e,asset)
                                    }>
                                    <div className='thread-list'>
                                        {displayList(thread,asset.asset_title)}
                                    </div>
                                    <div className='sub-thread'>
                                        <h4>Sub thread 1</h4>
                                        <input className='thread-input' type="text" name='thread' placeholder='Enter Text here' required/>
                                    </div>
                                    <div className='sub-interpretation'>
                                        <h4>Sub interpretation 1</h4>
                                        <input className='thread-input' type="text" name='interpretation' placeholder='Enter Text here' required/>
                                    </div>
                                    <button className='submit-thread'>+&nbsp;Sub-thread</button>
                                    <div className='thread-summary'>
                                        <h4>Summary for Thread A</h4>
                                        <input className='thread-input' type="text" name='summary' placeholder='Enter Text here' required/>
                                    </div>
                                </form>
                            </div>
                        : <></> 
                        }
                    </div>
                </div>
            </div>
        ))
        }
        </div>
    </section>
    </React.Fragment>
  )
}

export default Home;