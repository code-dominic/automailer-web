import React, { useState } from "react";
import { Form, FormControl, Button, Container } from "react-bootstrap";

const SearchBar = ( {query , setQuery}) => {


  const handleSearch = (event) => {
    event.preventDefault();
    alert(`Searching for: ${query}`);
  };

  return (
    <Container className="mt-3 d-flex">


      <Form className="d-flex" onSubmit={handleSearch}>
        <FormControl
          type="search"
          placeholder="Search..."
          className="me-2"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="primary" type="submit">Search</Button>
      </Form>
    </Container>
  );
};

export default SearchBar;
