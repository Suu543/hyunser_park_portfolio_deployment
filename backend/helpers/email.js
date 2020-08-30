exports.registerEmailParams = (recipientEmail, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [recipientEmail],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
                    <html>
                        <h1>Verify Your Email Address</h1>
                        <p>Please use the following link to complete your registration:</p>
                        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                    </html>
                `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Complete Your Registration",
      },
    },
  };
};

exports.forgotPasswordEmailParams = (recipientEmail, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [recipientEmail],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
                  <html>
                    <h1>Reset Password Link</h1>
                    <p>Please Use the following link to reset your password:</p>
                    <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                  </html>
            `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Complete Your Password Reset",
      },
    },
  };
};

exports.getContactDataAndSendToMe = (name, recipientEmail, message) => {
  return {
    Source: recipientEmail,
    Destination: {
      ToAddresses: [process.env.EMAIL_TO],
    },
    ReplyToAddresses: [recipientEmail],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <h1>Hi, Hyunser Park! This is ${name}</h1>
              <p>${message}</p>
            </html>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Data From Your Client...",
      },
    },
  };
};

exports.getContactEmail = (email) => {
  return {
    Source: email,
    Destination: {
      ToAddresses: [process.env.EMAIL_TO],
    },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <h1>Hi, Hyunser Park!</h1>
              <p>${email} is trying to contact you...</p>
            </html>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Data From Your Client...",
      },
    },
  };
};
