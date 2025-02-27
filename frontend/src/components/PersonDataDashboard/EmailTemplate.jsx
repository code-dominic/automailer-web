import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const EmailTemplate = ({currEmail}) => {
    const {subject , greeting, body , styles , buttonLable } = currEmail


  return (
    <Card style={{ maxWidth: "800px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", borderRadius: "10px", height: "100%" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          The mail You Have sent
        </Typography>

        <div style={{ marginTop: "2rem", padding: "2rem", backgroundColor: "#ffffff", color: "#000000", borderRadius: "10px" }}>
          <h2 style={{ marginBottom: "1rem", backgroundColor: styles.backgroundColor, color: styles.textColor, textAlign: "center", padding: "1rem", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
            {subject}
          </h2>
          <p style={{ marginBottom: "1rem" }}>{greeting}</p>
          <p style={{ marginBottom: "1rem" }}>{body}</p>
          <a target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: styles.buttonColor, color: styles.buttonTextColor, textDecoration: "none", borderRadius: "5px", fontWeight: "bold" }}>
            {buttonLable || "Click here"}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailTemplate;
