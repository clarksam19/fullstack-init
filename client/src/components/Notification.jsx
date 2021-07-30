import React from "react";

const Notification = ({ notification }) => {
  const { type, message } = notification;

  const styles = {
    success: {
      color: "green",
      fontStyle: "italic",
      fontSize: 16,
    },
    error: {
      color: "red",
      background: "lightgrey",
      fontSize: "20px",
      borderStyle: "solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    },
  };

  return <p style={styles[type]}>{message}</p>;
};

export default Notification;
