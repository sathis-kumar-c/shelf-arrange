import { useState } from "react";

const img1 = "https://cdn-icons-png.flaticon.com/512/4329/4329542.png";
const img2 = "https://cdn-icons-png.flaticon.com/512/859/859415.png";
const img3 = "https://cdn-icons-png.flaticon.com/512/3076/3076091.png";
const img4 = "https://cdn-icons-png.flaticon.com/512/4329/4329538.png";
const img5 = "https://cdn-icons-png.flaticon.com/512/4506/4506077.png";
const img6 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQHIty1AD6UqfXbm9rdm_7HdCN8LgMTkENQg&usqp=CAU";
const img7 =
  "https://icon-library.com/images/snacks-icon-png/snacks-icon-png-16.jpg";
const img8 =
  "https://icons.veryicon.com/png/o/food--drinks/food-icon/soda-1.png";
const img9 = "https://cdn-icons-png.flaticon.com/512/683/683974.png";
const img10 = "https://icon-library.com/images/snacks-icon/snacks-icon-15.jpg";

const img11 =
  "https://cdn1.iconfinder.com/data/icons/food-drinks-solid/128/Snacks_Cold_Drink_Bottle_Finger_Chips_French_Fries-512.png";

const img12 =
  "https://cdn4.iconfinder.com/data/icons/drinks-glyph/64/can_lipo_glyph-512.png";

const img13 =
  "https://cdn3.iconfinder.com/data/icons/drinks-beverages/91/Drinks__Beverages_27-512.png";
const img14 =
  "https://cdn4.iconfinder.com/data/icons/summer-182/512/summer11-512.png";
const img15 =
  "https://as1.ftcdn.net/v2/jpg/01/91/51/92/1000_F_191519272_jW8uVmVH1HTNAQfn9fB8a6DAqJRjcuNB.jpg";
const img16 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB2ZgUIvUxQoSO6w06Hd1wT3XQFzBTAnHHdA&usqp=CAU";
const img17 = "https://cdn-icons-png.flaticon.com/512/1051/1051948.png";

const img18 = "https://cdn-icons-png.flaticon.com/512/947/947859.png";
const img19 =
  "https://weinersltd.com/cdn/shop/products/31284-Frito-Lay-Flavor-Mix-Chips-Snacks-Variety-Pack-front4_1024x1024@2x.jpg?v=1634088322";
const img20 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4aDf0xsh_aZy15oK9reac0aoBJpTGJ-bdAZQ-rvIToOiKZNpfphroKMDxotBv4WJTQJY&usqp=CAU";

const Shelf = () => {
  //products array
  const newProduct = [
    { id: 1, img: img1, name: "product 1" },
    { id: 2, img: img2, name: "product 2" },
    { id: 3, img: img3, name: "product 3" },
    { id: 4, img: img4, name: "product 4" },
    { id: 5, img: img5, name: "product 5" },
    { id: 6, img: img6, name: "product 6" },
    { id: 7, img: img7, name: "product 7" },
    { id: 8, img: img8, name: "product 9" },
    { id: 9, img: img9, name: "product 9" },
    { id: 10, img: img10, name: "product 10" },
    { id: 11, img: img11, name: "product 11" },
    { id: 12, img: img12, name: "product 12" },
    { id: 13, img: img13, name: "product 13" },
    { id: 14, img: img14, name: "product 14" },
    { id: 15, img: img15, name: "product 15" },
    { id: 16, img: img16, name: "product 16" },
    { id: 17, img: img17, name: "product 17" },
    { id: 18, img: img18, name: "product 18" },
    { id: 19, img: img19, name: "product 19" },
    { id: 20, img: img20, name: "product 20" },
  ];

  const [proId, setProId] = useState(1);

  //number of shelfs
  const [row, setRow] = useState(3);

  let isDraggingFromShelfParent = false; // Flag to indicate drag from shelfParent

  const handleDragStart = (event, id, where) => {
    console.log("handleDragStart event", event);
    console.log("handleDragStart where", where);
    event.dataTransfer.setData("text", id);
    event.dataTransfer.setData("place", where);
    isDraggingFromShelfParent = true; // Set the flag for drag from shelfParent
  };

  const handleDrop = (event, index, where) => {
    const place = event.dataTransfer.getData("place");

    if (place === "cloneFromNewProducts") {
      // Cloning logic
      event.preventDefault();
      const productId = event.dataTransfer.getData("text");
      const product = newProduct.find(
        (item) => item.id.toString() === productId
      );

      const clonedProduct = document.createElement("img");
      clonedProduct.src = product.img;
      clonedProduct.alt = product.name;
      clonedProduct.draggable = true;
      clonedProduct.className = "clonedProduct";
      clonedProduct.id = proId;

      clonedProduct.addEventListener("dragstart", (event) =>
        handleDragStart(event, proId, "moveFromShelf")
      );
      clonedProduct.addEventListener("dragend", (event) =>
        handleDragEnd(event)
      );

      const rect = event.target.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      if (distance < 50) {
        // alert("Cannot drop.");
        console.log("Product already exists at this location. Cannot drop.");
        return;
      }

      clonedProduct.style.position = "absolute";
      clonedProduct.style.left = `${offsetX - 15}px`;
      clonedProduct.style.top = `${offsetY - 15}px`;
      clonedProduct.style.width = `50px`;

      const rowParent = document.getElementById(`row-${index}`);
      if (rowParent) {
        rowParent.appendChild(clonedProduct);
      } else {
        console.error(`Row parent with ID row-${index} not found.`);
      }
      setProId(proId + 1);
    } else if (place === "moveFromShelf") {
      // Moving logic
      event.preventDefault();
      const productId = event.dataTransfer.getData("text");
      const productElement = document.getElementById(productId);

      const rect = event.target.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      if (distance < 50) {
        // alert("Cannot drop.");
        console.log("Product already exists at this location. Cannot drop.");
        return;
      }

      if (productElement) {
        productElement.style.position = "absolute";
        productElement.style.left = `${offsetX - 15}px`;
        productElement.style.top = `${offsetY - 15}px`;

        const rowParent = document.getElementById(`row-${index}`);
        if (rowParent) {
          rowParent.appendChild(productElement);
        } else {
          console.error(`Row parent with ID row-${index} not found.`);
        }
      } else {
        console.error(`Product element with ID ${productId} not found.`);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnd = (event) => {
    event.preventDefault();
    const draggedProduct = event.target;
    draggedProduct.style.position = "absolute";
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Shelf</h1>

      <div style={{ display: "flex" }}>
        <div className="newProductParent">
          {newProduct.map((product) => (
            <button
              className="newProductChild"
              key={product.id}
              draggable
              onDragStart={(event) =>
                handleDragStart(event, product.id, "cloneFromNewProducts")
              }
            >
              <img src={product.img} alt={product.name} />
            </button>
          ))}
        </div>

        <div className="shelfParent">
          {[...Array(row)].map((_, index) => (
            <div
              key={index}
              id={`row-${index}`}
              onDrop={(event) => handleDrop(event, index, "dropInShelfParent")}
              onDragOver={handleDragOver}
              className="rowParent"
            ></div>
          ))}
        </div>
      </div>

      <div className="btnParent">
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
      </div>
    </>
  );
};

export default Shelf;
