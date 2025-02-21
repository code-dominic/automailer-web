const Template =( {subject, greeting, body, buttonLabel, buttonLink,styles, _id })=>{
    return( `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .email-container { max-width: 600px; margin: 2rem auto; background-color: #ffffff ; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); overflow: hidden; }
        .email-header { background-color: ${styles.backgroundColor}; color: ${styles.textColor}; text-align: center; padding: 1rem; }
        .email-body { padding: 1.5rem; color: #333333; line-height: 1.6; }
        .button { display: inline-block; padding: 0.75rem 1.5rem; background-color:${styles.buttonColor}; color: ${styles.buttonTextColor}; text-decoration: none; font-size: 1rem; border-radius: 5px; margin-top: 1rem; }
        .button:hover { background-color: #45a049; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>${subject}</h1>
        </div>
        <div class="email-body">
          <p>${greeting}</p>
          <p>${body}</p>
         <a href="http://localhost:5000/emails/track?userId=${_id}" 
   class="button"
   target="_blank"
   style="display: inline-block; padding: 0.75rem 1.5rem; background-color:${styles.buttonColor}; color: ${styles.buttonTextColor}; text-decoration: none; font-size: 1rem; border-radius: 5px; margin-top: 1rem;">
   ${buttonLabel}
</a>

        </div>
      </div>
    </body>
    </html>
  `)};

module.exports =Template;