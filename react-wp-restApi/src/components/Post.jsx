import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import Filter from "./Filter";
import Loader from "../pages/Loader";

export default function Post() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [categoryPost, setCategoryPost] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <>
          <h1 className="text-center mt-5">Tutti i post</h1>
          <Filter setPosts={setPosts} setCategoryPost={setCategoryPost} />
          <MDBRow>
            <MDBCol className="d-flex justify-content-center flex-wrap">
              {posts?.map((post) => (
                <MDBCard className="m-5" style={{ width: "50%" }}>
                  {post._embedded["wp:featuredmedia"] &&
                    post._embedded["wp:featuredmedia"][0] && (
                      <MDBCardImage
                        src={post._embedded["wp:featuredmedia"][0].source_url}
                        position="top"
                        alt="..."
                      />
                    )}
                  <MDBCardBody>
                    <MDBCardTitle><span dangerouslySetInnerHTML={{ __html: post.title.rendered }}></span></MDBCardTitle>
                    <MDBCardText className="fw-bold">
                      <div>
                        <i class="bi bi-person-fill"></i>{" "}
                        {post._embedded.author[0].name}
                      </div>
                      <div>
                      <i class="bi bi-tag-fill"></i> {post.primary_category.name}
                      </div>
                    </MDBCardText>
                    <MDBCardText>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered,
                        }}
                      />
                    </MDBCardText>
                    <MDBBtn onClick={() => navigate(`/post/${post.id}`)}>
                      Leggi di più
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </MDBCol>
          </MDBRow>
        </>
      )}
    </MDBContainer>
  );
}
