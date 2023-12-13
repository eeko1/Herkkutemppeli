const ordersDialog = document.getElementById("orderViewDialog") as HTMLDialogElement | null;
const openOrdersBtn = document.getElementById("open_orders") as HTMLButtonElement | null;
const closeOrdersBtn = document.getElementById("closeOrders") as HTMLButtonElement | null;

interface OrderData {
  order_id: string;
  user_id: string;
  status: string;
  order_date: string;
  ordered_items: string[]; // Assuming ordered_items is an array of strings
}

let ordersListData: OrderData[];

const openOrdersDialog = async () => {
  const ordersList = await fetch("/api/orderslist");
  ordersListData = await ordersList.json() as OrderData[];
  renderOrderData();
  ordersDialog?.showModal();
  ordersDialog?.addEventListener("keydown", trapFocus);
};

const closeOrdersDialog = (e?: Event) => {
  if (e) {
    e.preventDefault();
  }
  ordersDialog?.close();
  ordersDialog?.removeEventListener("keydown", trapFocus);
  openOrdersBtn?.focus();
};

openOrdersBtn?.addEventListener("click", openOrdersDialog);
closeOrdersBtn?.addEventListener("click", closeOrdersDialog);

if (localStorage.getItem("userLvlId") === "2") {
  openOrdersBtn.style.display = "flex";
} else {
  openOrdersBtn.style.display = "none";
}

function renderOrderData() {
  ordersDialog.innerHTML = "";

  ordersListData.forEach((orderData, index) => {
    const orderContainer = document.createElement("div");
    const orderContainerBtn = document.createElement("button");
    const orderedItemsList = document.createElement("ul");

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
          closeOrdersDialog();
        } else {
          openOrdersDialog();
          renderOrderData();
        }
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
    orderDateElement.textContent = `Order Date: ${new Date(orderData.order_date).toLocaleString()}`;

    const orderedItemsArray = Array.isArray(orderData.ordered_items) ? orderData.ordered_items : [orderData.ordered_items];

    const orderedItemsElement = document.createElement("p");
    orderedItemsElement.textContent = `ItemIDs: ${orderedItemsArray.join(", ").replace(/,/g, ", ")}`;

    ordersDialog.appendChild(closeOrdersBtn);
    ordersDialog.appendChild(orderContainer);
    orderContainer.appendChild(orderContainerBtn);
    orderContainer.appendChild(orderIdElement);
    orderContainer.appendChild(userIdElement);
    orderContainer.appendChild(statusElement);
    orderContainer.appendChild(orderDateElement);
    orderedItemsList.appendChild(orderedItemsElement);
    orderContainer.appendChild(orderedItemsList);
  });
}

function trapFocus(e: KeyboardEvent): void {
  // Your focus trapping logic for the orders dialog
}
