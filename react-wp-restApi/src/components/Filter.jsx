import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBContainer } from "mdb-react-ui-kit";

export default function Filter({ setPosts }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    axios
      .get("http://techcrunch.com/wp-json/wp/v2/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://techcrunch.com/wp-json/wp/v2/posts?_embed${category !== "all" ? `&categories=${category}` : ""}`)
      .then((res) => setPosts(res.data), )
      .catch((err) => console.log(err));
  }, [category]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <MDBContainer className="mt-5">
      <select class="form-select" aria-label="Categorie" onChange={handleCategoryChange}>
        <option selected value="all">Tutte le categorie</option>
        {categories?.map((category) => (
          <option value={category.id}>{category.name}</option>
        ))}
      </select>
    </MDBContainer>
  );
}
