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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Ritardo di 2 secondi
  }, []);

  return (
    <MDBContainer>
       <h1 className="text-center mt-5">Tutti i post</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Filter setPosts={setPosts} />
          <MDBRow>
            <MDBCol className="d-flex justify-content-center flex-wrap">
              {posts?.map((post) => (
                <MDBCard className="m-5" style={{ width: "50%" }}>
                  {post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0] && (
                    <MDBCardImage
                      src={post._embedded["wp:featuredmedia"][0].source_url}
                      position="top"
                      alt="..."
                    />
                  )}
                  <MDBCardBody>
                    <MDBCardTitle>{post.title.rendered}</MDBCardTitle>
                    <MDBCardText className="fw-bold"><i class="bi bi-person-fill"></i> {post._embedded.author[0].name}</MDBCardText>
                    <MDBCardText>
                      <span dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    </MDBCardText>
                    <MDBBtn onClick={() => navigate(`/post/${post.id}`)}>Leggi di più</MDBBtn>
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
