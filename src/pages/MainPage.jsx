import React from "react";
import Logo from "./../components/Logo";
import SearchInput from "./../components/SearchInput";

function MainPage(props) {
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <Logo className="mt-5" style={{ width: "400px", height: "auto" }} />

        <SearchInput className="mb-3 mt-5" style={{ width: "500px" }} />
      </div>
    </>
  );
}

export default MainPage;
