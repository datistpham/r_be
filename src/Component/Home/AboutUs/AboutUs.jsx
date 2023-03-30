import React, {useState } from 'react'
import Header from '../../Header/Header'
import "./style.scss"

const AboutUs = () => {
  return (
    <>
      <Header />
      <>
        <div style={{width: "100%", display: "flex", }}>
          <div style={{flex: "1 1 0"}}>
              <img style={{width: "100%"}} draggable={false} src="https://res.cloudinary.com/cockbook/image/upload/v1676559726/Screenshot_2023-02-16_220136_j9vqcb.png" alt="" />
          </div>
        </div>
        <Contact />
      </>
    </>
  )
}

const Contact = () => {
  const [contactData, setContactData] = useState({});
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState(false);

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  };

  const isValidMobile = (mobileno) => {
    return /^[6-9]\d{9}$/.test(mobileno);
  };

  const validateField = (field, value) => {
    if (value.length <= 0) {
      return (
        <>
          <span className="text-capitalize">{field}</span> is required field.
        </>
      );
    } else {
      if (field === "email") {
        if (!isValidEmail(value)) return "Invalid Email.";
      } else if (field === "mobile") {
        if (!isValidMobile(value)) return "Invalid Mobile Number.";
      } else {
        return "";
      }
    }
  };

  const handleBlur = (event) => {
    setErrorMsg(validateField(event.target.name, event.target.value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactData({
      ...contactData,
      [name]: value
    });

    if (name === "mobile") {
      setContactData({
        ...contactData,
        mobile: value.replace(/\D/, "")
      });
    }
  };

  const handleSubmit = (e) => {
    let isValided = false;
    e.preventDefault();

    if (
      contactData.name === "" ||
      contactData.name === undefined ||
      contactData.mobile === "" ||
      contactData.mobile === undefined ||
      contactData.email === "" ||
      contactData.email === undefined ||
      contactData.company === "" ||
      contactData.company === undefined ||
      contactData.message === "" ||
      contactData.message === undefined
    ) {
      setSuccessMsg(false);
      isValided = false;
    } else {
      setSuccessMsg(true);
      isValided = true;
    }
    return isValided;
  };

  return (
    <div id="contact">
      <div className="form">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          autoComplete="off"
        >
          {!successMsg ? (
            <>
              <div id="errormessage" className={errorMsg ? "show" : ""}>
                {errorMsg}
              </div>
              <div className="form-group">
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Họ và tên"
                  value={contactData.name || ""}
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  name="mobile"
                  type="text"
                  maxLength={10}
                  className="form-control"
                  placeholder="Điện thoại"
                  onBlur={handleBlur}
                  value={contactData.mobile || ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={contactData.email || ""}
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  name="message"
                  type="text"
                  className="form-control"
                  placeholder="Số lượng khách"
                  value={contactData.guest || ""}
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Loại hình tiệc"
                  value={contactData.type || ""}
                  onChange={(e) => handleChange(e)}
                  onBlur={handleBlur}
                />
              </div>
              <br />
              <p className="text-right mb-0">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Gửi"
                />
              </p>
            </>
          ) : (
            <div className="show" id="sendmessage">
              Cảm ơn vì bạn đã gửi thông tin, Chúng tôi sẽ liên hệ bạn sau
            </div>
          )}
        </form>
      </div>
    </div>
  );
};


export default AboutUs