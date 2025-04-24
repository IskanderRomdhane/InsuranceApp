import React, { useEffect, useState } from "react";
import axios from "axios";
import Star from "../assets/star.png";
import IconsPlus from "../assets/plus.png";
import IconsMinus from "../assets/icon-minus.svg";
import BgDesktop from "../assets/background-pattern-desktop.svg";
import BgMobile from "../assets/background-pattern-mobile.svg";

const FaqPage = () => {
  const [faqData, setFaqData] = useState([]);
  const [isClicked, setIsClicked] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 4;

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/faqs")
      .then((response) => setFaqData(response.data))
      .catch((error) => console.error("Failed to fetch FAQs:", error));
  }, []);

  const toggleFaq = (index) => {
    setIsClicked(isClicked === index ? null : index);
  };

  const totalPages = Math.ceil(faqData.length / faqsPerPage);
  const startIndex = (currentPage - 1) * faqsPerPage;
  const endIndex = startIndex + faqsPerPage;
  const paginatedFaqs = faqData.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const styles = {
    container: {
      fontFamily: "'Work Sans', sans-serif",
      backgroundColor: "#ffffff",
      display: "grid",
      placeItems: "center",
      minHeight: "100vh",
      paddingInline: "1rem",
      position: "relative",
    },
    bgImg: {
      position: "absolute",
      top: 0,
      left: 0,
      background: `white url(${
        window.innerWidth >= 1200 ? BgDesktop : BgMobile
      }) center/cover no-repeat`,
      height: "300px",
      width: "100%",
      zIndex: -1,
    },
    faqContainer: {
      backgroundColor: "white",
      maxWidth: "600px",
      width: "100%",
      // zIndex: 10,
      padding: "2rem 1.5rem",
      borderRadius: "1rem",
      boxShadow: "rgb(154 229 181) 0px 4px 8px",
    },
    title: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      marginBottom: "2rem",
    },
    titleText: {
      fontSize: "2.5rem",
    },
    faq: {
      marginBottom: "1rem",
      borderBottom: "1px solid #f9f0ff",
      cursor: "pointer",
    },
    question: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1rem",
    },
    questionText: {
      fontSize: "1.2rem",
      fontWeight: "700",
      color: "hsl(292, 42%, 14%)",
      transition: "0.2s ease-in",
    },
    content: (visible) => ({
      maxHeight: visible ? "999px" : 0,
      visibility: visible ? "visible" : "hidden",
      overflow: "hidden",
      color: "hsl(292, 16%, 49%)",
      transform: visible ? "scale(1)" : "scale(0)",
      transition: "all 0.5s ease",
      paddingBottom: visible ? "1rem" : 0,
    }),
    icon: {
      width: "25px",
      height: "25px",
    },
    star: {
      animation: "star 2s infinite",
    },
    pagination: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1.5rem",
    },
    button: {
      padding: "0.5rem 1rem",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#9ae5b5",
      color: "#333",
      cursor: "pointer",
      fontWeight: "bold",
    },
    disabledButton: {
      backgroundColor: "#eee",
      color: "#aaa",
      cursor: "not-allowed",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`@keyframes star {
                0% { transform: translateY(0); }
                50% { transform: translateY(-0.4rem); }
                100% { transform: translateY(0); }
              }`}
      </style>

      <div style={styles.bgImg}></div>

      <div style={styles.faqContainer}>
        {/* Title */}
        <div style={styles.title}>
          <img style={styles.star} src={Star} alt="star" />
          <h1 style={styles.titleText}>FAQs</h1>
        </div>

        {/* Paginated FAQs */}
        {paginatedFaqs.map((item, index) => (
          <div key={index} style={styles.faq} onClick={() => toggleFaq(index)}>
            <div style={styles.question}>
              <h2 style={styles.questionText}>{item.question}</h2>
              <img
                style={styles.icon}
                src={isClicked === index ? IconsMinus : IconsPlus}
                alt="toggle"
              />
            </div>
            <p style={styles.content(isClicked === index)}>{item.answer}</p>
          </div>
        ))}

        {/* Pagination Controls */}
        <div style={styles.pagination}>
          <button
            style={{
              ...styles.button,
              ...(currentPage === 1 && styles.disabledButton),
            }}
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            style={{
              ...styles.button,
              ...(currentPage === totalPages && styles.disabledButton),
            }}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
