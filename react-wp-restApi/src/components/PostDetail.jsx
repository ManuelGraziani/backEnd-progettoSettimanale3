import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";
import Loader from "../pages/Loader";

export default function PostDetail() {
    const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [postDetail, setPostDetail] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://techcrunch.com/wp-json/wp/v2/posts/${id}?_embed`
      )
      .then((res) => setPostDetail(res.data))
      .catch((err) => console.log(err));
  });
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Ritardo di 2 secondi
  }, []);
  return (
    <MDBContainer>
        {loading ? (
        <Loader />
      ) : (
        <div className="my-5">
        <h1>{postDetail?.title?.rendered}</h1>
        <p className=" fs-5"><i class="bi bi-person-fill"></i> {postDetail?._embedded?.author[0].name}</p>
        {postDetail?._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <img
            src={postDetail._embedded["wp:featuredmedia"][0].source_url}
            className="my-5"
            style={{ width: "50%" }}
          />
        )}
        {postDetail?.content?.rendered && (
          <div
            dangerouslySetInnerHTML={{ __html: postDetail.content.rendered }}
          />
        )}
      </div>
      )}
    </MDBContainer>
  );
}
