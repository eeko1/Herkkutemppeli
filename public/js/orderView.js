const ordersDialog = document.getElementById("orderViewDialog");
const openOrdersBtn = document.getElementById("open_orders");
const closeOrdersBtn = document.getElementById("closeOrders");
let ordersListData;

const openOrdersDialog = async () => {
  const ordersList = await fetch("/api/orderslist");
  ordersListData = await ordersList.json();
  renderOrderData();
  ordersDialog.showModal();
  ordersDialog.addEventListener("keydown", trapFocus);
};

const closeOrdersDialog = (e) => {
  if (e) {
    e.preventDefault();
  }
  ordersDialog.close();
  ordersDialog.removeEventListener("keydown", trapFocus);
  openOrdersBtn.focus();
};

openOrdersBtn.addEventListener("click", openOrdersDialog);
closeOrdersBtn.addEventListener("click", closeOrdersDialog);

if (localStorage.getItem("userLvlId") == "2") {
  // Display the button
  openOrdersBtn.style.display = "flex";
} else {
  openOrdersBtn.style.display = "none";
}

function renderOrderData() {
  // Clear previous content before appending new elements
  ordersDialog.innerHTML = "";

  ordersListData.forEach((orderData, index) => {
    const orderContainer = document.createElement("div");
    const orderContainerBtn = document.createElement("button");
    const orderedItemsList = document.createElement("ul"); // New element for ordered items

    orderContainerBtn.textContent = "Confirm";
    orderContainerBtn.addEventListener("click", async () => {
      const response = await fetch("/api/confirm-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: orderData.order_id }),
      });

      if (response.ok) {
        if (index === ordersListData.length - 1) {
          // If it's the last item, close the dialog
          closeOrdersDialog();
        } else {
          // If it's not the last item, keep the dialog open
          openOrdersDialog();
          renderOrderData();
        }
        console.log("ran renderOrderData");
      } else {
        alert("Error confirming order!");
      }
    });

    const orderIdElement = document.createElement("p");
    orderIdElement.textContent = `Order ID: ${orderData.order_id}`;

    const userIdElement = document.createElement("p");
    userIdElement.textContent = `User ID: ${orderData.user_id}`;

    const statusElement = document.createElement("p");
    statusElement.textContent = `Status: ${orderData.status}`;

    const orderDateElement = document.createElement("p");
    orderDateElement.textContent = `Order Date: ${new Date(
      orderData.order_date
    ).toLocaleString()}`;

    const orderedItemsArray = Array.isArray(orderData.ordered_items)
      ? orderData.ordered_items
      : [orderData.ordered_items];

    // Concatenate ordered items into a single string
    const orderedItemsElement = document.createElement("p");
    orderedItemsElement.textContent = `ItemIDs: ${orderedItemsArray
      .join(", ")
      .replace(/,/g, ", ")}`;

    /*     console.log(`ItemIDs: ${orderedItemsArray.join(", ")}`); */

    // Append elements to the ordersDialog
    ordersDialog.appendChild(closeOrdersBtn);
    ordersDialog.appendChild(orderContainer);
    orderContainer.appendChild(orderContainerBtn);
    orderContainer.appendChild(orderIdElement);
    orderContainer.appendChild(userIdElement);
    orderContainer.appendChild(statusElement);
    orderContainer.appendChild(orderDateElement);
    orderedItemsList.appendChild(orderedItemsElement);

    // Append orderedItemsList to orderContainer
    orderContainer.appendChild(orderedItemsList);
  });
}
