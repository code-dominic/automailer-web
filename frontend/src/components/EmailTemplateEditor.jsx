import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Card, CardContent, Typography, IconButton, Tooltip } from "@mui/material";
import { ChromePicker, SketchPicker } from "react-color";
import { ColorLens } from "@mui/icons-material";

const EmailTemplateEditor = () => {
  const [subject, setSubject] = useState("Welcome to AutoMailer!");
  const [greeting, setGreeting] = useState("Hello [User's Name],");
  const [body, setBody] = useState("We are thrilled to have you on board! To get started, click the button below:");
  const [buttonLabel, setButtonLabel] = useState("Get Started");
  const [buttonLink, setButtonLink] = useState("https://example.com");
  const [styles, setStyles] = useState({
    backgroundColor: "#15B346",
    textColor: "#000000",
    buttonColor: "#15B346",
    buttonTextColor: "#000000",
  });
  const [message, setMessage] = useState("");
  const [activePicker, setActivePicker] = useState(null);
  const pickerRef = useRef(null);

  const handleStyleChange = (styleKey, color) => {
    setStyles((prev) => ({ ...prev, [styleKey]: color.hex }));
  };

  const handleSubmit = async () => {
    const emailTemplate = {
      subject,
      greeting,
      body,
      buttonLabel,
      buttonLink,
      styles,
    };

    console.log(emailTemplate);

    try {
      const response = await axios.post("http://localhost:5000/emails/send", { emailTemplate });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error sending emails:", error);
      setMessage("Error sending emails. Please try again.");
    }
  };


  const handleSave = async () => {
    const emailTemplate = {
      subject,
      greeting,
      body,
      buttonLabel,
      buttonLink,
      styles,
    };

    console.log(emailTemplate);

    try {
      const response = await axios.post("http://localhost:5000/emails/save", { emailTemplate });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error Saving  emails:", error);
      setMessage("Error Saving emails. Please try again.");
    }
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setActivePicker(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Card
      style={{
        maxWidth: "800px",
        // margin: "2rem auto",
        // padding: "1.5rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        height : "100%"
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom
        >
          Customize Your Email Template
        </Typography>

        {/* Editable Live Preview */}
        <div
          style={{
            marginTop: "2rem",
            padding: "2rem",
            backgroundColor: "#ffffff",
            color: "#000000",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          {/* Background Color Picker */}
          {activePicker === "backgroundColor" && (
            <div ref={pickerRef} style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1000 }}>
              <SketchPicker
                color={styles.backgroundColor}
                onChange={(color) => handleStyleChange("backgroundColor", color)}
              />
            </div>
          )}
          <Tooltip title="Click Here to change header background Color">
          <IconButton
            color="primary"
            onClick={() => setActivePicker("backgroundColor")}
            style={{ marginBottom: "1rem" }}
          >
            <ColorLens />
          </IconButton> 
          </Tooltip>
          

          {/* Subject */}
          <h2
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setSubject(e.target.innerText)}
            style={{ 
              marginBottom: "1rem", 
              cursor: "text",
              backgroundColor: styles.backgroundColor,  // ✅ Fixed camelCase
              color: styles.textColor,                  // ✅ Fixed camelCase
              textAlign: "center",                       // ✅ Fixed camelCase
              padding: "1rem",
              borderTopLeftRadius : "10px",
              borderTopRightRadius : "10px",
            }}
          >
            {subject}
          </h2>

          {/* Text Color Picker */}
          {activePicker === "textColor" && (
            <div ref={pickerRef} style={{ position: "absolute", top: "100px", left: "10px", zIndex: 1000 }}>
              <SketchPicker 
                color={styles.textColor}
                onChange={(color) => handleStyleChange("textColor", color)}
              />
            </div>
          )}
          <Tooltip title="Click Here to change header Text Color">
          <IconButton
            color="primary"
            onClick={() => setActivePicker("textColor")}
            style={{ marginBottom: "1rem" }}
          >
            <ColorLens />
          </IconButton>
          </Tooltip>

          {/* Greeting */}
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setGreeting(e.target.innerText)}
            style={{ marginBottom: "1rem", cursor: "text" }}
          >
            {greeting}
          </p>

          {/* Body */}
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setBody(e.target.innerText)}
            style={{ marginBottom: "1rem", cursor: "text" }}
          >
            {body}
          </p>

          {/* Button Color Picker */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <a
              href={buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: styles.buttonColor,
                color: styles.buttonTextColor,
                textDecoration: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setButtonLabel(e.target.innerText)}
            >
              {buttonLabel}
            </a>
            {activePicker === "buttonColor" && (
              <div ref={pickerRef} style={{ position: "absolute", top: "40px", left: "0", zIndex: 1000 }}>
                <SketchPicker
                  color={styles.buttonColor}
                  onChange={(color) => handleStyleChange("buttonColor", color)}
                />
              </div>
            )}
            <Tooltip title="Click Here to change button background Color">
            <IconButton
              color="primary"
              onClick={() => setActivePicker("buttonColor")}
              style={{ marginLeft: "1rem" }}
            >
              <ColorLens />
            </IconButton>
            </Tooltip>
          </div>

          {/* Button Text Color Picker */}
          {activePicker === "buttonTextColor" && (
            <div ref={pickerRef} style={{ position: "absolute", top: "300px", left: "10px", zIndex: 1000 }}>
              <SketchPicker
                color={styles.buttonTextColor}
                onChange={(color) => handleStyleChange("buttonTextColor", color)}
              />
            </div>
          )}
          <Tooltip title="Click Here to change button Text Color">
          <IconButton
            color="primary"
            onClick={() => setActivePicker("buttonTextColor")}
            style={{ marginLeft: "1rem" }}
          >
            <ColorLens />
          </IconButton>
          </Tooltip>

          {/* Button Link (Editable by Double Click) */}
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setButtonLink(e.target.innerText)}
            style={{ marginTop: "1rem", cursor: "text", fontStyle: "italic" }}
          >
            {buttonLink}
          </p>
        </div>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "1rem" }}
        >
          Send Email
        </Button>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginTop: "1rem" , marginLeft :  "1rem"}}
        >
          Save
        </Button>

        {/* Message */}
        {message && <Typography style={{ marginTop: "1rem", color: "green" }}>{message}</Typography>}
      </CardContent>
    </Card>
  );
};

export default EmailTemplateEditor;