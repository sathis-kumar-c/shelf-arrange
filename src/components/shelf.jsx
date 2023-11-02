import React, { useEffect, useRef, useState } from "react";
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
import {
  calculatePercentage,
  calculatePercentageInPixels,
  checkPosition,
  handleConvertToPDF,
  handleExport,
  pxToCm,
} from "../utilities";

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
    { id: 1, img: img1, name: "product 1", height: "115px", width: "90px" },
    { id: 2, img: img2, name: "product 2", height: "100px", width: "80px" },
    { id: 3, img: img3, name: "product 3", height: "85px", width: "65px" },
    { id: 4, img: img4, name: "product 4", height: "90px", width: "100px" },
    { id: 5, img: img5, name: "product 5", height: "100px", width: "87px" },
    { id: 6, img: img6, name: "product 6", height: "80px", width: "65px" },
    { id: 7, img: img7, name: "product 7", height: "142px", width: "98px" },
    { id: 8, img: img8, name: "product 9", height: "130px", width: "100px" },
    { id: 9, img: img9, name: "product 9", height: "135px", width: "91px" },
    { id: 10, img: img10, name: "product 10", height: "125px", width: "78px" },
    { id: 11, img: img11, name: "product 11", height: "100px", width: "60px" },
    { id: 12, img: img12, name: "product 12", height: "107px", width: "89px" },
    { id: 13, img: img13, name: "product 13", height: "90px", width: "73px" },
    { id: 14, img: img14, name: "product 14", height: "95px", width: "98px" },
    { id: 15, img: img15, name: "product 15", height: "125px", width: "87px" },
    { id: 16, img: img16, name: "product 16", height: "150px", width: "100px" },
    { id: 17, img: img17, name: "product 17", height: "155px", width: "91px" },
    { id: 18, img: img18, name: "product 18", height: "120px", width: "56px" },
    { id: 19, img: img19, name: "product 19", height: "110px", width: "90px" },
    { id: 20, img: img20, name: "product 20", height: "115px", width: "110px" },
  ];

  //row data
  const [rowData, setRowData] = useState(null);

  //set unique id
  const [uniqueId, setUniqueId] = useState(1);

  //percentage value
  const [perVal, setPerVal] = useState(null);

  //currnt product while drag start
  const [currentProdcut, setCurrrentProduct] = useState(null);

  //ref for rowparent(shelf row)
  const rowParentRef = useRef(null);

  //triggers while drag start
  const handleDragStart = (e, product, where, rowIwherendex) => {
    e.dataTransfer.setData("product", JSON.stringify(product));
    e.dataTransfer.setData("where", where);
    e.dataTransfer.setData("index", rowIwherendex);

    setCurrrentProduct(product);

    // Capture the initial mouse click position relative to the image
    const imageX = e.clientX - e.target.getBoundingClientRect().left;
    const imageY = e.clientY - e.target.getBoundingClientRect().top;

    e.dataTransfer.setData("imageX", imageX);
    e.dataTransfer.setData("imageY", imageY);

    // You can use imageX and imageY for your needs
    console.log("Initial image click position - X:", imageX, "Y:", imageY);
  };

  //triggers while drop image
  const handleDrop = (e, rowIndex, res) => {
    const product = JSON.parse(e.dataTransfer.getData("product"));
    const place = e.dataTransfer.getData("where");
    const indexValue = e.dataTransfer.getData("index");
    const imageX = Number(e.dataTransfer.getData("imageX"));
    const imageY = Number(e.dataTransfer.getData("imageY"));

    let resHeight = parseInt(res.height);
    let proHeight = parseInt(product.height);
    let proWidth = parseInt(product.width);

    // Check if the dropped product is fit for this row
    if (proHeight < resHeight && res.remainingwidth >= proWidth) {
      // Check if dragged from new products
      if (place === "fromNewProducts") {
        // Get the position where the image is dropped
        const rowParent = e.currentTarget;
        const rect = rowParent.getBoundingClientRect();
        const dropX = e.clientX - rect.left; // X position relative to the rowParent
        const dropY = e.clientY - rect.top; // Y position relative to the rowParent

        product.defaultId = product.id;
        product.id = `uniqueId-${uniqueId}`;
        setUniqueId(uniqueId + 1);

        const clonedProduct = { ...product };
        const updatedRows = [...rowData.rows];

        console.log("dropXY", dropX, dropY);
        console.log("imageXY", imageX, imageY);

        // Place the product in the exact position it was dropped
        clonedProduct.position = {
          x: dropX > imageX ? dropX - imageX : 0,
          y: dropY > imageY ? dropY - imageY : 0,
        };

        // Check if the total height exceeds the limit
        const totalHeight = clonedProduct.position.y + proHeight;
        const totalWidth = clonedProduct.position.x + proWidth;

        if (totalHeight > parseInt(res.height)) {
          // Calculate the excess height
          const excessHeight = totalHeight - parseInt(res.height);
          // Adjust the Y position to fit within the limit
          clonedProduct.position.y -= excessHeight;
        }

        if (totalWidth > parseInt(rowData.width)) {
          const excessWidth = totalWidth - parseInt(rowData.width);
          clonedProduct.position.x -= excessWidth;
        }

        updatedRows[rowIndex].data.push(clonedProduct);

        //add occupiedwidth
        updatedRows[rowIndex].occupiedwidth += proWidth;

        //remove remaining width
        updatedRows[rowIndex].remainingwidth -= proWidth;

        setRowData({ ...rowData, rows: updatedRows });
      }

      // Check if the drag event includes the Ctrl key being pressed
      //clone and add image, when its clicked in shelfParent
      if (e.ctrlKey && place === "fromShelfParent") {
        // Create a clone of the product for dropping while holding Ctrl
        const clonedProduct = { ...product };
        clonedProduct.id = `uniqueId-${uniqueId}`; // Set a new unique ID
        setUniqueId(uniqueId + 1);

        // Get the drop position relative to the rowParent
        const rowParent = e.currentTarget;
        const rect = rowParent.getBoundingClientRect();
        const dropX = e.clientX - rect.left;
        const dropY = e.clientY - rect.top;

        // Set the position for the cloned product
        clonedProduct.position = {
          x: dropX > imageX ? dropX - imageX : 0,
          y: dropY > imageY ? dropY - imageY : 0,
        };

        // Check if the total height exceeds the limit
        const totalHeight = clonedProduct.position.y + proHeight;
        const totalWidth = clonedProduct.position.x + proWidth;

        if (totalHeight > parseInt(res.height)) {
          // Calculate the excess height
          const excessHeight = totalHeight - parseInt(res.height);
          // Adjust the Y position to fit within the limit
          clonedProduct.position.y -= excessHeight;
        }

        if (totalWidth > parseInt(rowData.width)) {
          const excessWidth = totalWidth - parseInt(rowData.width);
          clonedProduct.position.x -= excessWidth;
        }

        // Add the cloned product to the updated row
        const updatedRows = [...rowData.rows];
        updatedRows[rowIndex].data.push(clonedProduct);

        // Adjust width and remaining width for the row
        updatedRows[rowIndex].occupiedwidth += parseInt(clonedProduct.width);
        updatedRows[rowIndex].remainingwidth -= parseInt(clonedProduct.width);

        setRowData({ ...rowData, rows: updatedRows });
      } else if (place === "fromShelfParent") {
        const clonedProduct = { ...product };
        const updatedRows = [...rowData.rows];
        const findInd = updatedRows[indexValue].data.findIndex(
          (item) => item.id === clonedProduct.id
        );

        const rowParent = e.currentTarget;
        const rect = rowParent.getBoundingClientRect();
        const dropX = e.clientX - rect.left; // X position relative to the rowParent
        const dropY = e.clientY - rect.top; // Y position relative to the rowParent

        console.log("dropXY", dropX, dropY);
        console.log("imageXY", imageX, imageY);

        // Place the product in the exact position it was dropped
        clonedProduct.position = {
          x: dropX > imageX ? dropX - imageX : 0,
          y: dropY > imageY ? dropY - imageY : 0,
        };

        // Check if the total height exceeds the limit
        const totalHeight = clonedProduct.position.y + proHeight;
        const totalWidth = clonedProduct.position.x + proWidth;

        if (totalHeight > parseInt(res.height)) {
          // Calculate the excess height
          const excessHeight = totalHeight - parseInt(res.height);
          // Adjust the Y position to fit within the limit
          clonedProduct.position.y -= excessHeight;
        }

        if (totalWidth > parseInt(rowData.width)) {
          const excessWidth = totalWidth - parseInt(rowData.width);
          clonedProduct.position.x -= excessWidth;
        }

        updatedRows[rowIndex].data.push(clonedProduct);
        updatedRows[indexValue].data.splice(findInd, 1);

        updatedRows[rowIndex].occupiedwidth += proWidth;
        updatedRows[rowIndex].remainingwidth -= proWidth;
        updatedRows[indexValue].occupiedwidth -= proWidth;
        updatedRows[indexValue].remainingwidth += proWidth;

        setRowData({ ...rowData, rows: updatedRows });
      }
    } else {
      toast.error(`${product.name} doesn't fit in this row, try other rows!`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    setCurrrentProduct(null);
    e.target.style.backgroundColor = "dimgray";
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

  //get width of the rowParent
  const getDivWidth = () => {
    const div = rowParentRef?.current;
    const width = div?.offsetWidth;
    let val = calculatePercentage(parseInt(width), parseInt(rowData?.width));
    setPerVal(val);
  };

  //mouse hover while drag
  const handleDragOver = (e, res) => {
    e.preventDefault();
    let dom = e.target;

    if (
      parseInt(calculatePercentageInPixels(res?.height, perVal)) >=
      parseInt(calculatePercentageInPixels(currentProdcut?.height, perVal))
    ) {
      dom.style.backgroundColor = "green";
    } else {
      dom.style.backgroundColor = "darkred";
    }
  };

  //mouse leave while drag
  const handleDragLeave = (e) => {
    e.preventDefault();
    let dom = e.target;
    dom.style.backgroundColor = "dimgray";
  };

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

  //useeffect for get width
  useEffect(() => {
    getDivWidth();
  }, [rowData]);

  //logs
  console.log("rowData", rowData);

  //listners for (remove image when dropped outside shelf)
  document.addEventListener("drop", handleDocumentDrop);
  document.addEventListener("dragover", handleDocumentDragOver);

  // Add a resize event listener to get the width when the screen size changes
  window.addEventListener("resize", getDivWidth);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{rowData?.name}</h1>

      <div style={{ display: "flex", width: "100%" }}>
        <div className="newProductParent" style={{ width: "25%" }}>
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
                  style={{
                    height: calculatePercentageInPixels(item.height, perVal),
                    width: calculatePercentageInPixels(item.width, perVal),
                  }}
                  alt={item.name}
                />
              </button>
            );
          })}
        </div>

        <div style={{ width: "75%" }}>
          <div className="shelfParent">
            {rowData?.rows?.map((res, rowIndex) => {
              return (
                <div
                  key={rowIndex}
                  style={{ display: "flex", columnGap: "10px" }}
                >
                  <div
                    ref={rowParentRef}
                    key={rowIndex}
                    id={`table-${rowIndex}`}
                    draggable={false}
                    className="rowParent"
                    style={{
                      height: calculatePercentageInPixels(res.height, perVal),
                      width: rowData.width,
                    }}
                    onDrop={(e) => handleDrop(e, rowIndex, res)}
                    onDragOver={(e) => {
                      handleDragOver(e, res, rowIndex);
                    }}
                    onDragLeave={(e) => {
                      handleDragLeave(e);
                    }}
                    onMouseDown={(e) => checkPosition(e)} // X and Y position (onClick)
                  >
                    {res.data?.map((product) => {
                      const style = product.position
                        ? {
                            left: calculatePercentageInPixels(
                              product.position.x,
                              perVal
                            ),
                            top: calculatePercentageInPixels(
                              product.position.y,
                              perVal
                            ),
                          }
                        : null;
                      return (
                        <img
                          key={product.id}
                          style={{
                            width: calculatePercentageInPixels(
                              product.width,
                              perVal
                            ),
                            height: calculatePercentageInPixels(
                              product.height,
                              perVal
                            ),
                            position: "absolute",
                            bottom: "0px",
                            ...style,
                          }}
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(
                              e,
                              product,
                              "fromShelfParent",
                              rowIndex
                            )
                          }
                          src={product.img}
                          alt={product.name}
                          // onClick={() => cloneImage(rowIndex, res, product)}
                        />
                      );
                    })}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                    }}
                  >
                    <div className="rowHeight"></div>
                    <p
                      style={{
                        color: "black",
                        alignSelf: "center",
                        fontSize: `${perVal}%`,
                      }}
                    >
                      Height : {pxToCm(parseInt(res.height)).toFixed(2)} CM
                      <br />
                      Products : {`${res?.data.length}`} Items
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ textAlign: "center", marginTop: "25px" }}>
            Total Shelf Width : {pxToCm(parseInt(rowData?.width)).toFixed(2)} CM
          </p>
          {/* <div
            className="showWidth"
            style={{ width: `${perVal == 100 ? perVal - 20 : 86}%` }}
          ></div>
          <p style={{ textAlign: "center" }}>
            Total Shelf Width : {pxToCm(parseInt(rowData?.width)).toFixed(2)} CM
          </p> */}

          <div className="btnsParent">
            <button
              className="pdfBtn"
              onClick={() => {
                handleConvertToPDF("shelfParent", "planogram");
                toast.success(`Converted successfully`, {
                  position: toast.POSITION.BOTTOM_LEFT,
                });
              }}
            >
              Convert to PDF
            </button>

            <button
              className="btnExport"
              onClick={() => {
                handleExport(rowData);
                toast.success(`Exported successfully`, {
                  position: toast.POSITION.BOTTOM_LEFT,
                });
              }}
            >
              Export as JSON
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default NewShelf;
