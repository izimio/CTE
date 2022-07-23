import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchWithBody from "../fetch";
import { Box, Center } from "@chakra-ui/react";
import Content from "./Content";
import LogoLock from "../../assets/lock.png";
import LogoKey from "../../assets/key.png";
import "./style/ContentCheckor.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContentUrl() {
  let [data, setData] = useState(() => 0);
  let [password, setPassword] = useState(() => "");

  let { id } = useParams();
  const [ls] = useState(() =>
    localStorage.getItem("credentials")
      ? JSON.parse(localStorage.getItem("credentials"))
      : {}
  );
  useEffect(
    (data) => {
      fetchWithBody(
        "GET",
        `http://localhost:4000/url/check/` + id,
        {},
        setData
      );
    },
    [id]
  );

  const manageLock = useCallback(() => {
    fetch(`http://localhost:4000/url/check/pwsd`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: id,
        password: password,
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
        if (res === 1) {
          toast.success("Acces granted", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            className: "toast-success",
          });
          localStorage.clear();
          localStorage.setItem(
            "credentials",
            JSON.stringify({ password: password, url: id })
          );
          window.location.reload(false);
        } else
          toast.error("Wrong password", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            className: "toast-error",
          });
      });
  }, [password, id]);
  const manageKey = useCallback(() => {
    fetch(`http://localhost:4000/url/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: id,
        password: password,
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
        localStorage.clear();
        localStorage.setItem(
          "credentials",
          JSON.stringify({ password: password, url: id })
        );
        window.location.reload(false);
      });
  }, [password, id]);

  const managePassword = useCallback(() => {
    if (data) {
      manageLock();
    } else {
      manageKey();
    }
  }, [data, manageLock, manageKey]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      managePassword();
    }
  };
  if (ls.url === id) {
    return <Content />;
  }
  return (
    <>
      {data ? (
        <Box className="content-all">
          <Center className="content-img">
            <img src={LogoLock} alt="lock" />
          </Center>
          <h1 className="content-all-title">
            <span style={{ color: "#d9534f" }}>
              This url is currently protected
            </span>{" "}
            <br /> enter the url's password to acces the datas
          </h1>
        </Box>
      ) : (
        <Box className="content-all">
          <Center className="content-img">
            <img src={LogoKey} alt="key" />
          </Center>
          <h1 className="content-all-title">
            <span style={{ color: "#5cb85c" }}>How nice ! </span> Nobody already
            claimed that url. <br /> you can make it yours by creating a
            password to protect it
          </h1>
        </Box>
      )}
      <Center className="content-input">
        <input
          type={data ? "password" : "text"}
          value={password}
          onKeyUp={(e) => password && handleKeyPress(e)}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={data ? "Enter the password" : "Create a password"}
        />
        <Box
          className="content-input-button"
          onClick={managePassword}
          bg={password ? "#28a4c9" : "grey"}
          p="0.5em"
        >
          Submit
        </Box>
      </Center>
      <ToastContainer />
    </>
  );
}
