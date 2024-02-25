const { generate } = require("otp-generator");

var sharedData = null;


module.exports = {
  registerCompany: async (req, res) => {
    sharedData = req.body;
    
    await checkAlresdyUserExsist(req, res);
  },
  otpVerification: async(req,res)=>{
    
    const enteredOTP = req.body.first + req.body.second +  req.body.third + req.body.fourth + req.body.fifth + req.body.sixth;
    if(_.isEqual(enteredOTP,req.session.otp) && (!(_.isNull(sharedData)) || _.isUndefined(sharedData) || _.isEmpty(sharedData) )) {
      
    }else{
    
    }
  }
};

const checkAlresdyUserExsist = async function (req, res) {
  req.body.email_id = req.body.email_id.trim().toLowerCase();
  req.body.mobile_no = req.body.mobile_no.trim();
  req.body.role_name = "O";

  //Find same User exist or not
  var data = await usersSchema.find(
    {
      $or: [{ email_id: req.body.email_id }, { mobile_no: req.body.mobile_no }],
    },
    { email_id: 1, mobile_no: 1, _id: 0 }
  );

  // Lodash is used for check _.isUndefined()
  if (_.isUndefined(data) || _.isEmpty(data) || _.isNull(data)) {

    //Same User not found
    const getOTP = await sendMail(req, res);
    // if (!(_.isNull(getOTP))) {

      // console.log("Touy jhbsjdbc: " + getOTP);
      // req.session.otp = getOTP; 
      // res.redirect("/home/otp");

    // }

    //save User
    await saveUser(req, res, data);
  } else {
    // Same User found
    await sameUserFound(req, res, data);
  }
};

//sendMail
const sendMail = async function (req, res) {
  try {
    //Send mail

    //Mail subject
    const mailSubject = "OTP";

    //Generate OTP
    const otp = generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    console.log("Generated OTP:", otp);
    const mailText = `${otp}`;

    //call sendEmail from controller
    const sendEmailBool = await emailController.sendEmail(
      req.body.email_id,
      mailSubject,
      mailText
    );

    if (sendEmailBool) {
      return otp;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Send email: " + error);
  }
};

const saveUser = async function (req, res, data) {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    data = new usersSchema(req.body);

    const result = await data.save();
    console.log(result);
    if (_.isNull(result) || _.isUndefined(result) || _.isEmpty(result)) {
      const alertMessage = "Sorry, Not registered. Please try again";

      await setErrorAlert(req, res, alertMessage);
      res.redirect("/home/subscription");
    }
    // console.log(result);

    count = 0;
    res.redirect("/home/auth-login");
  } catch (error) {
    console.log("saveUSer:" + error);
  }
};

const sameUserFound = async function (req, res, data) {
  try {
    data.forEach((user) => {
      if (user.email_id == req.body.email_id) {
        emailMatch = true;
      }
      if (user.mobile_no == req.body.mobile_no) {
        phoneMatch = true;
      }
    });
    if (emailMatch && phoneMatch) {
      emailMatch = false;
      phoneMatch = false;
      globalMessage =
        "My Dear, User already exist with the same Email and Phone number.";
    } else if (emailMatch) {
      emailMatch = false;
      globalMessage = "My Dear, User already exist with the same Email";
    } else if (phoneMatch) {
      phoneMatch = false;
      globalMessage = "My Dear, User already exist with the same Phone Number";
    }
    await setErrorAlert(req, res, globalMessage);
    res.redirect("/home/subscription");
  } catch (error) {
    console.log("sameUSerFound: " + error);
  }
};

const setErrorAlert = function (req, res, alertMessage) {
  try {
    req.session.alert = true;
    req.session.alertMessage = alertMessage;
  } catch (error) {
    console.log("registration-controller: setErrorAlert: " + error);
  }
};
