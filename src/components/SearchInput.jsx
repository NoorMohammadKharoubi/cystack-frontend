import React from "react";
import Button from "react-bootstrap/Button";
import { IoIosSearch } from "react-icons/io";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function SearchInput(props) {
  const [searchValue, setSearchValue] = useState(props.value);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (searchValue) {
      navigate("/certificates?q=" + searchValue);
    }
  };
  return (
    <InputGroup className={props.className} style={props.style}>
      <Form.Control
        placeholder="Search"
        value={searchValue}
        onChange={handleChange}
        onKeyPress={handleKeypress}
      />
      <Button variant="primary" onClick={handleSubmit}>
        <IoIosSearch />
      </Button>
    </InputGroup>
  );
}

export default SearchInput;
