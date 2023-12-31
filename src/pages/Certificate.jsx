import React from "react";
import { useState, useEffect } from "react";
import NotificationModal from "./../components/NotificationModal";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Logo from "./../components/Logo";
import SearchInput from "./../components/SearchInput";
import { useSearchParams, Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

function Certificate(props) {
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});
  const [showExpired, setShowExpired] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event, item) => {
    setItem(item);
    setShow(true);
  };
  const showExpiredOnly = () => setShowExpired(!showExpired);

  const [queryParameters] = useSearchParams();

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/api/certificates?q=" +
        queryParameters.get("q") +
        "&expired_only=" +
        showExpired
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [showExpired, queryParameters.get("q")]);

  return (
    <>
      <div className="d-flex flex-row justify-content-between m-4">
        <Link to="/">
          <Logo style={{ width: "180px", height: "auto" }} />
        </Link>

        <SearchInput
          style={{ width: "700px" }}
          value={queryParameters.get("q")}
        />
        <BootstrapSwitchButton
          checked={showExpired}
          onlabel="ExpiredOnly"
          offlabel="ALL"
          onChange={showExpiredOnly}
          onstyle="dark"
          offstyle="primary"
          style="border"
          width={180}
          height={50}
        />
      </div>

      <NotificationModal
        item={item}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />

      <Table responsive striped hover>
        <thead>
          <tr>
            <th>crt.sh ID</th>
            <th>Logged At</th>
            <th>Not Before</th>
            <th>Not After</th>
            <th>Common Name</th>
            <th>Matching Identities</th>
            <th>Issuer Name</th>
            <th>Get Notification</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <th>{item.issuer_ca_id}</th>
              <td>{item.entry_timestamp}</td>
              <td>{item.not_before}</td>
              <td>{item.not_after}</td>
              <td>{item.common_name}</td>
              <td>{item.name_value}</td>
              <td className="overflow col-md-2">{item.issuer_name}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={(event) => handleShow(event, item)}
                  disabled={
                    Date.parse(item.not_after) < Date.now() ? true : false
                  }
                >
                  Schedule
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Certificate;
