const nodemailer = require('nodemailer');
const crypto = require('crypto')

const fs = require('fs')




const uploadimage = async (onefile) => {
  try {
    const result = await cloudinary.uploader.upload(onefile.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "image",
      folder: "Let'sCook",
      transformation: [
        {
          width: 300,
          height: 420,
          crop: "fill_pad",
          gravity: "auto",
          quality: 100,
        },
      ],
    });
    let image = {
      url: result.url,
      public_id: result.public_id,
    };
    return image;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteFromCloud = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error.message);
  }
};

const genarateOTP = async () => {
  try {
    const otps = Math.floor(1000 + Math.random() * 9000);
    console.log(otps);
    const otp = otps.toString();
    const secret = crypto.createHash("sha256").update(otp).digest("hex");

    return { otp, secret };
  } catch (error) {
    console.log(error.message);
  }
};

const verifyOTP = (secret, otp) => {
  try {
    const userotp = crypto.createHash("sha256").update(otp).digest("hex");

    return userotp == secret;
  } catch (error) {
    console.log(error.message);
  }
};

const sendemailotp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'akramkorakkottil@gmail.com',
        pass: 'zuvlydretngxazpl',
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailoptions = {
      from: "akramkorakkottil@gmail.com",
      to: email,
      subject: "for verification mail",
      html: "<p>your otp is " + otp + "</p>",
    };

    transporter.sendMail(mailoptions, (error, data) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Email has been sent ", data.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  uploadimage,
  genarateOTP,
  verifyOTP,
  sendemailotp,
  deleteFromCloud
}