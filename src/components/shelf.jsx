import React, { Children, useEffect, useState } from "react";
import jsonData from "../data/shelf.json";
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
  //products array
  const newProduct = [
    { id: 1, img: img1, name: "product 1", height: "150px", width: "90px" },
    { id: 2, img: img2, name: "product 2", height: "120px", width: "80px" },
    { id: 3, img: img3, name: "product 3", height: "110px", width: "65px" },
    { id: 4, img: img4, name: "product 4", height: "90px", width: "100px" },
    { id: 5, img: img5, name: "product 5", height: "160px", width: "87px" },
    { id: 6, img: img6, name: "product 6", height: "80px", width: "65px" },
    { id: 7, img: img7, name: "product 7", height: "142px", width: "98px" },
    { id: 8, img: img8, name: "product 9", height: "170px", width: "100px" },
    { id: 9, img: img9, name: "product 9", height: "170px", width: "91px" },
    { id: 10, img: img10, name: "product 10", height: "110px", width: "78px" },
    { id: 11, img: img11, name: "product 11", height: "120px", width: "60px" },
    { id: 12, img: img12, name: "product 12", height: "100px", width: "89px" },
    { id: 13, img: img13, name: "product 13", height: "90px", width: "73px" },
    { id: 14, img: img14, name: "product 14", height: "95px", width: "98px" },
    { id: 15, img: img15, name: "product 15", height: "180px", width: "87px" },
    { id: 16, img: img16, name: "product 16", height: "200px", width: "100px" },
    { id: 17, img: img17, name: "product 17", height: "210px", width: "91px" },
    { id: 18, img: img18, name: "product 18", height: "180px", width: "56px" },
    { id: 19, img: img19, name: "product 19", height: "150px", width: "90px" },
    { id: 20, img: img20, name: "product 20", height: "135px", width: "110px" },
  ];

  //set new id for elements when drag
  const [proId, setProId] = useState(1);

  //row data
  const [rowData, setRowData] = useState(null);

  //when drag function start
  const handleDragStart = (event, id, where) => {
    console.log("handleDragStart event", event);
    console.log("handleDragStart where", where);
    event.dataTransfer.setData("text", id);
    event.dataTransfer.setData("place", where);
  };

  //when drag function hovering
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  //when drag function drop
  const handleDrop = (event, rowIndex, res) => {
    const place = event.dataTransfer.getData("place");
    const productId = event.dataTransfer.getData("text");

    const product = newProduct.find((item) => item.id.toString() === productId);

    console.log("res", res, product, res.height, product.height);

    const resMatch = res.height.match(/^(\d+)px$/);
    const proMatch = product.height.match(/^(\d+)px$/);

    let resHeight = resMatch ? parseInt(resMatch[1]) : null;
    let proHeight = proMatch ? parseInt(proMatch[1]) : null;

    console.log(resHeight, proHeight, proHeight < resHeight);

    if (proHeight < resHeight) {
      if (place === "cloneFromNewProducts") {
        event.preventDefault();

        console.log("product", product);

        const clonedProduct = document.createElement("img");
        clonedProduct.src = product.img;
        clonedProduct.alt = product.name;
        clonedProduct.draggable = true;
        clonedProduct.className = "clonedProduct";
        clonedProduct.id = proId;
        clonedProduct.style.width = `${product?.width}`;
        clonedProduct.style.height = `${product?.height}`;
        //   clonedProduct.style.marginTop = `5px`;
        //   clonedProduct.style.marginLeft = `5px`;

        clonedProduct.addEventListener("dragstart", (event) =>
          handleDragStart(event, proId, "moveFromShelf")
        );
        clonedProduct.addEventListener("dragend", (event) =>
          handleDragEnd(event)
        );

        const mouseX = event.clientX;
        let closestDistance = Infinity;
        let closestTd = null;

        const tdElements = document.querySelectorAll(`#table-${rowIndex} td`);

        for (let i = 0; i < tdElements.length; i++) {
          const rect = tdElements[i].getBoundingClientRect();
          const tdCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(mouseX - tdCenterX);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestTd = tdElements[i];
          }
        }

        if (!closestTd.hasChildNodes()) {
          const remainingTd = document.createElement("td");
          remainingTd.classList.add("tableData");
          closestTd.insertAdjacentElement("afterend", remainingTd);
          closestTd.appendChild(clonedProduct);
          setProId(proId + 1);
        } else {
          console.log("Cannot drop. TD already contains an image.");
        }
      } else if (place === "moveFromShelf") {
        event.preventDefault();

        const productId = event.dataTransfer.getData("text");
        const productElement = document.getElementById(productId);

        // Find the closest <td> based on the mouse position
        const mouseX = event.clientX;
        let closestDistance = Infinity;
        let closestTd = null;

        const tdElements = document.querySelectorAll(`#table-${rowIndex} td`);

        for (let i = 0; i < tdElements.length; i++) {
          const rect = tdElements[i].getBoundingClientRect();
          const tdCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(mouseX - tdCenterX);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestTd = tdElements[i];
          }
        }

        // Check <td> already contains an image
        if (!closestTd.hasChildNodes()) {
          // Move the product to the closest <td>
          closestTd.appendChild(productElement);
        } else {
          console.log("Cannot drop. TD already contains an image.");
        }
      }
    }
  };

  //when drag function end
  const handleDragEnd = (event) => {
    event.preventDefault();
    const draggedProduct = event.target;
    draggedProduct.style.position = "absolute";
  };

  const handleDocumentDrop = (event) => {
    event.preventDefault();
    const productId = event.dataTransfer.getData("text");
    const productElement = document.getElementById(productId);

    if (productElement) {
      // Check if the drop is outside the shelfParent
      const shelfParent = document.querySelector(".shelfParent");
      if (!shelfParent.contains(event.target)) {
        // Remove the product and the respective td
        const tdParent = productElement.parentElement;
        if (tdParent) {
          const trParent = tdParent.parentElement;
          if (trParent) {
            trParent.removeChild(tdParent);
          }
        }
      }
    }
  };

  const handleDocumentDragOver = (event) => {
    event.preventDefault();
  };

  document.addEventListener("drop", handleDocumentDrop);
  document.addEventListener("dragover", handleDocumentDragOver);

  useEffect(() => {
    setRowData(jsonData);
  }, []);

  console.log("rowData", rowData);

  let currentTdElement = document.querySelectorAll(".tableData");

  console.log("currentTdElement", currentTdElement);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Shelf</h1>

      <div style={{ display: "flex" }}>
        <div className="newProductParent">
          {newProduct.map((item) => {
            // console.log("item", item);
            return (
              <button
                className="newProductChild"
                key={item.id}
                draggable
                onDragStart={(event) =>
                  handleDragStart(event, item.id, "cloneFromNewProducts", item)
                }
              >
                <img
                  src={item.img}
                  style={{ height: `${item?.height}`, width: `${item?.width}` }}
                  alt={item.name}
                />
              </button>
            );
          })}
        </div>

        <div className="shelfParent">
          {rowData?.rows.map((_, rowIndex) => {
            // console.log("check", _);
            return (
              <table
                key={rowIndex}
                id={`table-${rowIndex}`}
                onDrop={(event) => handleDrop(event, rowIndex, _)}
                onDragOver={handleDragOver}
                className="rowParent"
                style={{ height: `${_.height}`, width: `${rowData.width}` }}
              >
                <tbody style={{ width: `${rowData.width}` }}>
                  <tr className="tableRow">
                    <td className="tableData" key={0}></td>
                  </tr>
                </tbody>
              </table>
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
    </>
  );
};

export default NewShelf;
