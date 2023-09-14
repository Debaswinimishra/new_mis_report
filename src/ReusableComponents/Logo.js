import React from "react";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: "20px", // Optional: Add some margin to the top of the image
      }}
    >
      <img
        src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1694061615~exp=1694062215~hmac=020fa9c6536d83aa7a110fab3b94d4cdfff551afa16d0742ccfe61171f5f3e7a"
        width="500"
        height="500"
        alt="No data available"
      />
    </div>
  );
};

export default Logo;
