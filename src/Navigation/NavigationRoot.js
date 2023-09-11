import { Link } from "react-router-dom";

function NavigationRoot() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="anganwadi">Anaganwadi</Link>
        <Link to="fellow">Fellow</Link>
        <Link to="school">School</Link>
      </nav>
    </>
  );
}

export default NavigationRoot;
