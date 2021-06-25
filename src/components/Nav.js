import { MusicNote } from "@material-ui/icons";
import React from "react";

function Nav({ libraryOpen, setLibraryOpen }) {
  return (
    <nav>
      <h1>Waves</h1>
      <button onClick={() => setLibraryOpen(!libraryOpen)}>
        Library
        <MusicNote />
      </button>
    </nav>
  );
}

export default Nav;
