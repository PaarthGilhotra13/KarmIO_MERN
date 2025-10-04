import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ApiServices from '../ApiServices';
import moment from 'moment';

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(false)
  const [profile, setProfile] = useState([])
  const [data, setData] = useState([])
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const addSidebar = () => {
    document.body.classList.toggle('toggle-sidebar');
  }
  const [seenAnnouncements, setSeenAnnouncements] = useState(false);
  useEffect(() => {
    if (data.length > 0) {
      setSeenAnnouncements(false);
    }
  }, [data]);
  useEffect(() => {
    const id = sessionStorage.getItem("userId")
    let data = {
      userId: id
    }
    ApiServices.GetAllEmployee(data)
      .then((res) => {
        setProfile(res?.data?.data[0])
        sessionStorage.setItem("empId", res?.data?.data[0]?._id)
      })
      .catch((err) => {
        console.log("Error is ", err);
      })

    ApiServices.GetAllAnnouncement()
      .then((res) => {
        setData(res?.data?.data)
      })
      .catch((err) => {
        console.log("Error is ", err);
      })
  }, [])
  var nav = useNavigate()
  function logoutfun() {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Logout !!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logout Successfully!",
          text: "You have been redirected to the login page.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        sessionStorage.clear()
        nav("/")
      }
    });
  }
  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-start">
          <Link to="/employee" className="logo d-flex align-items-center ms-3">
            <img src="/assets/img/logo3.png" alt="" />
            <span className="d-lg-block" style={{ color: "#25353e" }}>कर्मIO</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" onClick={addSidebar} />

        </div>
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => setSeenAnnouncements(true)}
              >
                <i className="bi bi-bell" />
                {!seenAnnouncements && data.length > 0 && (
                  <span className="badge bg-primary badge-number">{data.length}</span>
                )}
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header d-flex justify-content-between align-items-center">
                  <span>You have {data.length} new {data.length === 1 ? "message" : "messages"}</span>
                  <Link to="/employee/viewAnnouncement">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                  </Link>
                </li>

                <li><hr className="dropdown-divider" /></li>

                {data.length === 0 ? (
                  <li className="px-3 text-muted">No Announcement Found</li>
                ) : (
                  data.map((el, index) => (
                    <li className="message-item d-flex px-3 py-2" key={index}>
                      <img
                        src={el?.createdBy?.picture || "/assets/img/admin_Profile.png"}
                        alt="User"
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                        style={{ objectFit: "cover" }}
                      />
                      <div>
                        <h6 className="mb-0 fw-bold text-dark">{el?.createdBy?.name || "Admin"}</h6>
                        <p className="mb-0 fw-semibold">{el?.title}</p>
                        <p className="mb-0 text-muted small">{el?.message}</p>
                        <p className="mb-0 text-muted small">{moment(el.createdAt).fromNow()}</p>
                      </div>
                    </li>
                  ))
                )}

                <li><hr className="dropdown-divider" /></li>

                <li className="dropdown-footer text-center">
                  <Link to="/employee/viewAnnouncement">Show all messages</Link>
                </li>
              </ul>
            </li>



            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src={profile.picture}
                  alt="Profile"
                  className="rounded-circle profile-img"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {profile?.name}
                </span>
              </Link>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <img
                    src={profile.picture}
                    alt="Profile"
                    className="rounded-circle mb-2"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <h6>{profile?.name}</h6>
                  <span>{profile?.jobTitle}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/employee/myProfile"
                  >
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link onClick={logoutfun} className="dropdown-item d-flex align-items-center" >
                    <i className="bi bi-box-arrow-right" />
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </li>
            {/* End Profile Dropdown Items */}
            {/* End Profile Nav */}
          </ul>
        </nav>
        {/* End Icons Navigation */}
      </header>
      {/* End Header */}
    </>
  );
}