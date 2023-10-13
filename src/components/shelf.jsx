import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img1 from "../images/RACK/Slice 1.png";
import img2 from "../images/RACK/Slice 2.png";
import img3 from "../images/RACK/Slice 3.png";
import img4 from "../images/RACK/Slice 4.png";
import img5 from "../images/RACK/Slice 5.png";
import img6 from "../images/RACK/Slice 6.png";
import img7 from "../images/RACK/Slice 7.png";
import img8 from "../images/RACK/Slice 8.png";
import img9 from "../images/RACK/Slice 9.png";
import img10 from "../images/RACK/Slice 10.png";
import img11 from "../images/RACK/Slice 11.png";
import img12 from "../images/RACK/Slice 12.png";
import img13 from "../images/RACK/Slice 13.png";
import img14 from "../images/RACK/Slice 14.png";
import img15 from "../images/RACK/Slice 15.png";
import img16 from "../images/RACK/Slice 16.png";
import img17 from "../images/RACK/Slice 17.png";
import img18 from "../images/RACK/Slice 18.png";
import img19 from "../images/RACK/Slice 19.png";
import img20 from "../images/RACK/Slice 20.png";

const NewShelf = () => {
  //shelf data
  const jsonData = {
    rows: [
      {
        data: [],
        height: "170px",
        occupiedwidth: 0,
      },
      {
        data: [],
        height: "140px",
        occupiedwidth: 0,
      },
      {
        data: [],
        height: "120px",
        occupiedwidth: 0,
      },
      {
        data: [],
        height: "95px",
        occupiedwidth: 0,
      },
    ],
    width: "1200px",
    name: "Products Shelf",
  };

  //products data
  const newProduct = [
    { id: 1, img: img1, name: "product 1", height: "135px", width: "90px" },
    { id: 2, img: img2, name: "product 2", height: "115px", width: "80px" },
    { id: 3, img: img3, name: "product 3", height: "100px", width: "65px" },
    { id: 4, img: img4, name: "product 4", height: "90px", width: "100px" },
    { id: 5, img: img5, name: "product 5", height: "100px", width: "87px" },
    { id: 6, img: img6, name: "product 6", height: "80px", width: "65px" },
    { id: 7, img: img7, name: "product 7", height: "142px", width: "98px" },
    { id: 8, img: img8, name: "product 9", height: "150px", width: "100px" },
    { id: 9, img: img9, name: "product 9", height: "155px", width: "91px" },
    { id: 10, img: img10, name: "product 10", height: "125px", width: "78px" },
    { id: 11, img: img11, name: "product 11", height: "100px", width: "60px" },
    { id: 12, img: img12, name: "product 12", height: "107px", width: "89px" },
    { id: 13, img: img13, name: "product 13", height: "90px", width: "73px" },
    { id: 14, img: img14, name: "product 14", height: "95px", width: "98px" },
    { id: 15, img: img15, name: "product 15", height: "145px", width: "87px" },
    { id: 16, img: img16, name: "product 16", height: "200px", width: "100px" },
    { id: 17, img: img17, name: "product 17", height: "210px", width: "91px" },
    { id: 18, img: img18, name: "product 18", height: "160px", width: "56px" },
    { id: 19, img: img19, name: "product 19", height: "135px", width: "90px" },
    { id: 20, img: img20, name: "product 20", height: "135px", width: "110px" },
  ];

  //row data
  const [rowData, setRowData] = useState(null);

  //set unique id
  const [uniqueId, setUniqueId] = useState(1);

  //useeffect
  useEffect(() => {
    //add remainingwidth for every shelf
    const modifiedJsonData = {
      ...jsonData,
      rows: jsonData.rows.map((row) => ({
        ...row,
        remainingwidth: parseInt(jsonData.width),
      })),
    };

    setRowData(modifiedJsonData);
  }, []);

  //handle drag start
  const handleDragStart = (e, product, where, rowIwherendex) => {
    e.dataTransfer.setData("product", JSON.stringify(product));
    e.dataTransfer.setData("where", where);
    e.dataTransfer.setData("index", rowIwherendex);
  };

  //handle drag drop
  const handleDrop = (e, rowIndex, res) => {
    const product = JSON.parse(e.dataTransfer.getData("product"));
    const place = e.dataTransfer.getData("where");
    const indexValue = e.dataTransfer.getData("index");

    let resHeight = parseInt(res.height);
    let proHeight = parseInt(product.height);

    //check dropped product is fit for this row
    if (
      proHeight < resHeight &&
      res.remainingwidth >= parseInt(product.width)
    ) {
      //check the if dragged from fromNewProducts
      if (place === "fromNewProducts") {
        //set unique id for images when dragged from fromNewProducts
        product.id = `product-${uniqueId}`;
        setUniqueId(uniqueId + 1);

        // Clone the product if it's dragged from the new products
        const clonedProduct = { ...product };
        const updatedRows = [...rowData.rows];

        //push new product dropped place
        updatedRows[rowIndex].data.push(clonedProduct);

        //add occupiedwidth
        updatedRows[rowIndex].occupiedwidth =
          parseInt(updatedRows[rowIndex].occupiedwidth) +
          parseInt(clonedProduct.width);

        // add remainingWidth
        updatedRows[rowIndex].remainingwidth =
          parseInt(rowData.width) -
          parseInt(updatedRows[rowIndex].occupiedwidth);

        setRowData({ ...rowData, rows: updatedRows });
      }

      //check the if dragged from fromShelfParent
      if (place === "fromShelfParent") {
        // Clone the product if it's dragged from the new products
        const clonedProduct = { ...product };
        const updatedRows = [...rowData.rows];

        //find index for dragged image(object)
        let findInd = updatedRows[indexValue].data.findIndex(
          (item) => item.id == clonedProduct.id
        );

        //push new product dropped place
        updatedRows[rowIndex].data.push(clonedProduct);

        //remove product from dragged place
        updatedRows[indexValue].data.splice(findInd, 1);

        //remove occupiedwidth from dragged
        updatedRows[indexValue].occupiedwidth =
          parseInt(updatedRows[indexValue].occupiedwidth) -
          parseInt(clonedProduct.width);

        //add occupiedwidth to dropped
        updatedRows[rowIndex].occupiedwidth =
          parseInt(updatedRows[rowIndex].occupiedwidth) +
          parseInt(clonedProduct.width);

        // add remainingWidth to dropped
        updatedRows[rowIndex].remainingwidth =
          parseInt(rowData.width) -
          parseInt(updatedRows[rowIndex].occupiedwidth);

        // remove remainingWidth to dropped
        updatedRows[indexValue].remainingwidth =
          parseInt(rowData.width) -
          parseInt(updatedRows[indexValue].occupiedwidth);

        setRowData({ ...rowData, rows: updatedRows });
      }
    } else {
      // display toast when image doesn't fit
      toast.error(`${product.name} doesn't fit in this row, try other rows!`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  // remove image when dropped outside shelf
  const handleDocumentDrop = (event) => {
    event.preventDefault();

    const shelfParent = document.querySelector(".shelfParent");

    //check the image dropped inside or outside shelfParent
    if (!shelfParent.contains(event.target)) {
      const product = JSON.parse(event.dataTransfer.getData("product"));
      const indexValue = event.dataTransfer.getData("index");

      // Check if rowData and indexValue exist
      if (rowData && rowData.rows && indexValue !== "") {
        const updatedRows = [...rowData.rows];
        const rowIndex = parseInt(indexValue);

        // Check if rowIndex is within the valid range
        if (rowIndex >= 0 && rowIndex < updatedRows.length) {
          const row = updatedRows[rowIndex];

          // Check if row.occupiedwidth is defined
          if (row && typeof row.occupiedwidth !== "undefined") {
            const productIndex = row.data.findIndex(
              (item) => product.id === item.id
            );

            if (productIndex !== -1) {
              // Remove the product from the row
              row.data.splice(productIndex, 1);

              // Update occupiedwidth and remainingwidth
              row.occupiedwidth -= parseInt(product.width);
              row.remainingwidth += parseInt(product.width);

              setRowData({ ...rowData, rows: updatedRows });

              // display toast when image removed successfully
              toast.success(`${product.name} removed successfully`, {
                position: toast.POSITION.BOTTOM_LEFT,
              });
            }
          } else {
            console.error("Invalid row data: occupiedwidth is undefined");
          }
        } else {
          console.error("Invalid rowIndex: Out of range");
        }
      } else {
        console.error("Invalid rowData or indexValue");
      }
    }
  };

  //while image dragging hover
  const handleDocumentDragOver = (event) => {
    event.preventDefault();
  };

  //listners for (remove image when dropped outside shelf)
  document.addEventListener("drop", handleDocumentDrop);
  document.addEventListener("dragover", handleDocumentDragOver);

  //shelf details
  console.log("rowData", rowData);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{rowData?.name}</h1>

      <div style={{ display: "flex" }}>
        <div className="newProductParent">
          {newProduct?.map((item) => {
            return (
              <button
                key={item.id}
                className="newProductChild"
                draggable
                onDragStart={(e) => handleDragStart(e, item, "fromNewProducts")}
              >
                <img
                  src={item.img}
                  style={{ height: item.height, width: item.width }}
                  alt={item.name}
                />
              </button>
            );
          })}
        </div>

        <div className="shelfParent">
          {rowData?.rows?.map((res, rowIndex) => {
            return (
              <div
                key={rowIndex}
                id={`table-${rowIndex}`}
                className="rowParent"
                style={{ height: res.height, width: rowData.width }}
                onDrop={(e) => handleDrop(e, rowIndex, res)}
                onDragOver={(e) => e.preventDefault()}
              >
                {res.data?.map((product) => {
                  return (
                    <img
                      key={product.id}
                      src={product.img}
                      alt={product.name}
                      style={{ width: product.width, height: product.height }}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, product, "fromShelfParent", rowIndex)
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="btnParent">
        <button
          className="btnAddRem"
          disabled={row === 5}
          onClick={() => {
            setRow(row + 1);
          }}
        >
          Add Row
        </button>

        <button
          className="btnAddRem"
          disabled={row === 3}
          onClick={() => {
            setRow(row - 1);
          }}
        >
          Remove Row
        </button>
      </div> */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
};

export default NewShelf;
