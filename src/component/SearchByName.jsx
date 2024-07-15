import React, { useEffect, useState, useRef } from "react";
import { Input, Card, List, ListItem } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const SearchByName = () => {
  const inputRef = useRef();
  const resultRef = useRef(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query && resultRef.current) {
      document.body.addEventListener("keydown", onKeyDown);
    } else {
      document.body.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [query]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/shop/products/active`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        return;
        // console.error("Error fetching data:", error);
      });
  }, []);

  function handleOnChange(event) {
    const { value } = event.target;
    setQuery(value.toLowerCase());
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
  const onKeyDown = (event) => {
    if (resultRef.current) {
      const isUp = event.key === "ArrowUp";
      const isDown = event.key === "ArrowDown";
      const isInputFocused = document.activeElement === inputRef.current;
      const resultItems = Array.from(resultRef.current.children);
      const activeResultItems = resultItems.findIndex(
        (child) => child.querySelector("a") === document.activeElement
      );

      if (isUp) {
        event.preventDefault();
        if (isInputFocused) {
          resultItems[resultItems.length - 1]?.querySelector("a")?.focus();
        } else if (activeResultItems > 0) {
          resultItems[activeResultItems - 1]?.querySelector("a")?.focus();
        } else {
          inputRef.current.focus();
          console.log("up");
        }
      }

      if (isDown) {
        event.preventDefault();
        if (isInputFocused && resultItems.length > 0) {
          resultItems[0]?.querySelector("a")?.focus();
        } else if (resultItems.length > activeResultItems + 1) {
          resultItems[activeResultItems + 1]?.querySelector("a")?.focus();
        } else {
          inputRef.current.focus();
          console.log("down");
        }
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <div id="search" className="w-[16rem]">
        <div className="relative flex w-full gap-2 pt-1">
          <Input
            ref={inputRef}
            type="text"
            value={query}
            placeholder="Search"
            onChange={handleOnChange}
            containerProps={{
              className: "w-full",
            }}
            className="bg-white !border-t-green-900 pl-9 placeholder:text-green-900 focus:!border-green-900  dark:!border-t-deep-purple-900 dark:placeholder:text-deep-purple-900 dark:focus:!border-deep-purple-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <div className="!absolute left-3 top-[16px]">
            <svg
              width="13"
              height="14"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z" />
              <path
                d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                className=" stroke-green-900 dark:stroke-deep-purple-700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <Card
          className="w-[16rem] bg-gray-200 top-[80%] z-[999] "
          style={{ position: "absolute" }}
        >
          {query && (
            <List ref={resultRef}>
              {filteredProducts.length === 0 ? (
                <ListItem
                  as="ul"
                  style={{
                    padding: "0.5rem 0rem 0.5rem 0rem",
                  }}
                >
                  No matched result.
                </ListItem>
              ) : (
                filteredProducts.slice(0, 5).map((product) => (
                  <ListItem
                    as="ul"
                    style={{
                      marginTop: "-0.5px",
                      marginBottom: "-0.5px",
                      padding: "0rem 0rem 0rem 0rem",
                      textAlign: "center",
                      width: "240px",
                    }}
                    key={product._id}
                  >
                    <Link
                      as="li"
                      to={`/shop/products/${product._id}`}
                      style={{
                        width: "300px",
                        padding: "0.5rem 2.6rem 0.5rem 2rem",
                      }}
                      className="text-decoration-none fw-bold text-dark"
                    >
                      {product.name}
                    </Link>
                  </ListItem>
                ))
              )}
            </List>
          )}
        </Card>
      </div>
    </>
    //
  );
};

export default SearchByName;
