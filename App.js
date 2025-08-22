import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  let [formData, setFormData] = useState({
    uname: '',
    uemail: '',
    uphone: '',
    umessage: '',
    index: '',
  });

  let [userData, setUserData] = useState([]);

  let getValue = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  let handleSumbit = (event) => {
    event.preventDefault();

    let currentUserFormdata = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umessage: formData.umessage,
    };

    // Check if email or phone already exists
    let checkFilterUser = userData.filter(
      (v) => v.uemail === formData.uemail || v.uphone === formData.uphone
    );

    if (checkFilterUser.length > 0) {
      toast.error('Email or phone already exists');
    } else {
      let oldUserData = [...userData, currentUserFormdata];
      setUserData(oldUserData);

      setFormData({
        uname: '',
        uemail: '',
        uphone: '',
        umessage: '',
        index: '',
      });

      toast.success('Data Added');
    }
  };

  let deleteRow = (indexNumber) => {
    let filterDataafterDelete = userData.filter((v, i) => i !== indexNumber);
    toast.success('Data Deleted');
    setUserData(filterDataafterDelete);
  };

  return (
    <Container fluid>
      <ToastContainer />
      <Container>
        <Row>
          <Col className="text-center py-5">
            <h1>Enquiry Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <form onSubmit={handleSumbit}>
              <div className="pb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  onChange={getValue}
                  value={formData.uname}
                  name="uname"
                  className="form-control"
                />
              </div>
              <div className="pb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  onChange={getValue}
                  value={formData.uemail}
                  name="uemail"
                  className="form-control"
                />
              </div>
              <div className="pb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  onChange={getValue}
                  value={formData.uphone}
                  name="uphone"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="umessage" className="form-label">
                  Message
                </label>
                <textarea
                  onChange={getValue}
                  value={formData.umessage}
                  className="form-control"
                  name="umessage"
                  id="umessage"
                  rows="3"
                ></textarea>
              </div>

              <button className="btn btn-primary">
                {formData.index !== '' ? 'Update' : 'Save'}
              </button>
            </form>
          </Col>

          <Col lg={7}>
            <table className="table table-striped table-bordered table-hover mt-4">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length > 0 ? (
                  userData.map((obj, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{obj.uname}</td>
                      <td>{obj.uemail}</td>
                      <td>{obj.uphone}</td>
                      <td>{obj.umessage}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => deleteRow(i)}
                        >
                          Delete
                        </button>
                        <button className="btn btn-warning btn-sm">Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
