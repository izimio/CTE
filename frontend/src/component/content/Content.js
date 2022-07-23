import { Box, Center } from "@chakra-ui/react";
import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./style/content.css";
import "react-toastify/dist/ReactToastify.css";

export default function Content() {
  let { id } = useParams();
  let [content, setContent] = useState(() => "");
  let navigate = useNavigate();
  const [ls] = useState(() =>
    localStorage.getItem("credentials")
      ? JSON.parse(localStorage.getItem("credentials"))
      : {}
  );
  const checkAuth = useCallback(() => {
    console.log(ls.url, id);
    if (ls.url !== id) {
      localStorage.clear();
      navigate("/");
    }

    fetch(`http://localhost:4000/url/check/pwsd`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: ls.url,
        password: ls.password,
      }),
    })
      .catch((err) => {
        toast.error(err, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          className: "toast-error",
        });
      })
      .then((res) => res.json())
      .then((res) => {
        if (res !== 1) {
          localStorage.clear();
          navigate("/");
        }
      });
  }, [ls, navigate, id]);

  const getRessource = useCallback(() => {
    fetch(
      `http://localhost:4000/url/ressource/` +
        "?password=" +
        ls.password +
        "&url=" +
        ls.url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setContent(res.content);
      });
  }, [ls]);
  const save_element = useCallback(() => {
    fetch(`http://localhost:4000/url/save/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: ls.url,
        password: ls.password,
        content: content,
      }),
    })
      .catch((err) => {
        toast.error(err, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          className: "toast-error",
        });
      })
      .then((res) =>
        toast.success("Saved", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          className: "toast-success",
        })
      );
  }, [ls, content]);

  useEffect(() => {
    checkAuth();
    getRessource();
  }, [checkAuth, getRessource]);
  return (
    <>
      <Center mt="-3em">
        <h1>Here is your accessible confidential text area!</h1>
      </Center>
      <Center>
        <textarea
          value={content}
          style={{
            maxWidth: "80%",
            minWidth: "50%",
            maxHeight: "60vh",
            minHeight: "50vh",
            fontSize: "1.5em",
            padding: "1em",
          }}
          id="textarea"
          cols="70"
          onChange={(e) => setContent(e.target.value)}
        />
      </Center>
      <Center>
        <Box
          className="save-button"
          as="button"
          onClick={() => {
            save_element();
          }}
          mt="1em"
          mb="1em"
          border="1px solid #ccc"
          borderRadius="5px"
          padding="0.5em"
          bg="#fff"
          color="#000"
          fontSize="1.5em"
          fontWeight="bold"
          cursor="pointer"
        >
          Save
        </Box>
      </Center>
      <ToastContainer limit={1} />
    </>
  );
}
