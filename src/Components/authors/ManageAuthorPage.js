import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import AuthorForm from "./AuthorForm";
import { useHistory } from "react-router-dom";

export function ManageAuthorPage() {
  const authors = useSelector((state) => state.authors);
  const [author, setAuthor] = useState({ id: null, name: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (authors.length === 0) {
      dispatch(loadAuthors()).catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthor((prev) => ({
      ...prev,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { name } = author;
    const errors = {};
    if (!name) errors.author = "Author name is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    dispatch(saveAuthor(author))
      .then(() => {
        toast.success("Author Saved");
        history.push("/authors");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <AuthorForm
      errors={errors}
      author={author}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

export function getAuthorBySlug(authors, slug) {
  return authors.find((author) => author.slug === slug) || null;
}

export default ManageAuthorPage;
