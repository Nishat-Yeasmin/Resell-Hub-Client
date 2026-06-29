"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
const [open, setOpen] = useState(false);


  // Better Auth user id
 const {data:session} = authClient.useSession();
 const userId = session?.user?.id;

  const loadOrders = () => {
    fetch(`http://localhost:5000/orders?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  };

  useEffect(() => {
    if(!userId) return;

    loadOrders();
  }, [userId]);


  const viewOrder = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/orders/${id}`
  );

  const data = await res.json();

  setSelectedOrder(data);

  setOpen(true);
};


  const cancelOrder = async (id) => {
  if (!confirm("Are you sure you want to cancel this order?")) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/orders/${id}/cancel`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Order cancelled successfully.");
    loadOrders();
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6">

      <h1 className="text-3xl font-bold text-center">
        My Orders
      </h1>

      <p className="text-gray-400 text-center mt-2 mb-6">
        Buyers can manage all their orders from this page.
      </p>

      <div className="overflow-x-auto">

        <table className="table w-full">

          <thead className="bg-gray-700 text-gray-300">

            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
              <th>Details</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order._id}>

                <td>{order.productTitle}</td>

                <td>{order.quantity}</td>

                <td>${order.totalAmount}</td>

                <td>

                  <span
                    className={`badge

                    ${
                      order.orderStatus === "pending"
                        ? "badge-warning"

                        : order.orderStatus ===
                          "accepted"
                        ? "badge-info"

                        : order.orderStatus ===
                          "cancelled"
                        ? "badge-error"

                        : order.orderStatus === "processing"
    ? "badge-primary"
    : order.orderStatus === "shipped"
    ? "badge-secondary"
    : order.orderStatus === "delivered"
    ? "badge-success"

                        : "badge-success"
                    }

                    `}
                  >
                    {order.orderStatus}
                  </span>

                </td>

                <td>

                  <button className="btn btn-info btn-sm"
                   onClick={() => viewOrder(order._id)}
                   >
                    View
                  </button>

                </td>

                <td>

                  {order.orderStatus ===
                  "pending" ? (

                    <button
                      className="btn btn-error btn-sm cursor-pointer"
                      onClick={() =>
                        cancelOrder(order._id)
                      }
                    >
                      Cancel
                    </button>

                  ) : (
                    <button
                      disabled
                      className="btn btn-disabled btn-sm cursor-pointer"
                    >
                      Cancelled
                    </button>
                  )}

                </td>

              </tr>

              

            ))}

          </tbody>
        </table>

        
                               {open && selectedOrder && (
  <dialog open className="modal modal-open items-start py-20">
    <div className="modal-box max-w-2xl max-h-[80vh] overflow-y-auto bg-amber-50 rounded-xl">

      <h2 className="text-2xl text-center text-blue-900 font-bold mb-5">
        Order Details
      </h2>

      <div className="space-y-3">

        <img
  src={selectedOrder.productImage}
  alt={selectedOrder.productTitle}
  className="w-40 h-40 object-cover rounded-lg mx-auto mb-5"
/>

        <p className="text-2xl text-blue-800">
          <strong className="text-2xl text-blue-900">Product:</strong>{" "}
          {selectedOrder.productTitle}
        </p>

        <p className="text-2xl text-blue-800">
          <strong className="text-2xl text-blue-900">Quantity:</strong>{" "}
          {selectedOrder.quantity}
        </p>

        <p className="text-2xl text-blue-800">
          <strong className="text-2xl text-blue-900">Total:</strong> $
          {selectedOrder.totalAmount}
        </p>

        <p className="text-2xl text-blue-800">
          <strong className="text-2xl text-blue-900">Status:</strong>{" "}
          {selectedOrder.orderStatus}
        </p>

        <p className="text-2xl text-blue-800">
          <strong className="text-2xl text-blue-900">Payment:</strong>{" "}
          {selectedOrder.paymentStatus}
        </p>

        <p className="text-2xl text-blue-800">
          <strong className="text-2xl text-blue-900">Buyer:</strong>{" "}
          {selectedOrder.buyerInfo?.name}
        </p>

        <p className="text-2xl text-blue-800">
          <strong className="text-2xl text-blue-900">Email:</strong>{" "}
          {selectedOrder.buyerInfo?.email}
        </p>

        <div className="bg-gray-300 p-3 rounded-lg">
  <strong className="text-2xl text-blue-900">Shipping Address:</strong>
  <p className="text-2xl">{selectedOrder.shippingAddress}</p>
</div>

      </div>

      <div className="modal-action">

        <button
          className="btn"
          onClick={() => setOpen(false)}
        >
          Close
        </button>

      </div>

    </div>
  </dialog>
)}

        

      </div>

    </div>
  );
};

export default BuyerOrders;