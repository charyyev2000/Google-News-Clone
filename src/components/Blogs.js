import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";
import "../styling/blogs.css";

const Blogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchInput = useSelector(selectUserInput);

  const url = `https://gnews.io/api/v4/search?q=${searchInput}&token=e70951a5f6667773d450600011a05486
    `;
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        dispatch(setBlogData(res.data));
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [searchInput]);
  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading ? <h1 className="loading">Loading</h1> : ""}
      <div className="blogs">
        {data?.articles?.map((item, i) => (
          <a key={i} href={item.url} className="blog" target="_blank">
            <img src={item.image} alt={item.title} />
            <div>
              <h3 className="sourceName">
                <span>{item.source.name}</span>
                <p>{item.publishedAt}</p>
              </h3>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
            </div>
          </a>
        ))}

        {data.totalArticles == 0 && (
          <h1 className="no__blogs">No blogs available</h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
