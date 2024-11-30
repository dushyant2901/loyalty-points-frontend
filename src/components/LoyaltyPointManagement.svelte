<script lang="ts">
  import { onMount } from "svelte";

  // dummy data
  let loyaltyPoints = [
    { id: 1, name: "Reward Points", totalSupply: 10000, symbol: "RP" },
    { id: 2, name: "Membership Points", totalSupply: 5000, symbol: "MP" },
    { id: 3, name: "Promo Points", totalSupply: 15000, symbol: "PP" },
  ];
  let transactions = [
    { id: "tx001", date: "2024-01-10", amount: 100, recipient: "0xABC123" },
    { id: "tx002", date: "2024-01-11", amount: 200, recipient: "0xDEF456" },
  ];
  let selectedPoint = null;
  let recipientAddress = "";
  let amount = "";
  let loading = false;
  let errorMessage = "";

  // Fetch loyalty points from the API
  const fetchLoyaltyPoints = async () => {
    try {
      loading = true;
      const response = await fetch("/api/loyalty/manage");
      const data = await response.json();
      loyaltyPoints = data.loyaltyPoints;
    } catch (error) {
      errorMessage = "Failed to fetch loyalty points.";
      console.error(error);
    } finally {
      loading = false;
    }
  };

  // Fetch transactions for the selected loyalty point
  const fetchTransactions = async () => {
    if (!selectedPoint) {
      alert("Please select a loyalty point.");
      return;
    }
    try {
      loading = true;
      const response = await fetch(
        `/api/loyalty/transactions?loyaltyPointId=${selectedPoint.id}`
      );
      const data = await response.json();
      transactions = data.transactions;
    } catch (error) {
      errorMessage = "Failed to fetch transactions.";
      console.error(error);
    } finally {
      loading = false;
    }
  };

  // Distribute points to the recipient
  const distributePoints = async () => {
    if (!selectedPoint || !recipientAddress || !amount) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      loading = true;
      const response = await fetch("/api/loyalty/distribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loyaltyPointId: selectedPoint.id,
          recipientAddress,
          amount: parseInt(amount),
        }),
      });
      const result = await response.json();
      if (result.status === "success") {
        alert(
          `Distributed ${amount} ${selectedPoint.symbol} to ${recipientAddress}`
        );
        recipientAddress = "";
        amount = "";
        await fetchTransactions(); // Refresh transactions after distribution
      } else {
        throw new Error(result.message || "Failed to distribute points.");
      }
    } catch (error) {
      errorMessage = "Failed to distribute points.";
      console.error(error);
    } finally {
      loading = false;
    }
  };

  // Fetch loyalty points on component mount
  // onMount(fetchLoyaltyPoints);
</script>

<div class="p-6 bg-white shadow-md rounded-lg">
  {#if loading}
    <p class="text-blue-500">Loading...</p>
  {/if}

  {#if errorMessage}
    <p class="text-red-500 mb-4">{errorMessage}</p>
  {/if}

  <!-- Loyalty Points Dropdown -->
  <div class="mb-4">
    <label
      for="loyaltyPoint"
      class="block text-sm font-bold text-gray-700 mb-2"
    >
      Select Loyalty Point
    </label>
    <select
      id="loyaltyPoint"
      bind:value={selectedPoint}
      class="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500"
    >
      <option disabled selected>Select a loyalty point</option>
      {#each loyaltyPoints as point}
        <option value={point}>{point.name} ({point.symbol})</option>
      {/each}
    </select>
  </div>

  <!-- Distribution Form -->
  <div class="mb-4">
    <label
      for="recipientAddress"
      class="block text-sm font-bold text-gray-700 mb-2"
    >
      Recipient Address
    </label>
    <input
      id="recipientAddress"
      type="text"
      bind:value={recipientAddress}
      placeholder="Enter recipient address"
      class="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500"
    />
  </div>

  <div class="mb-4">
    <label for="amount" class="block text-sm font-bold text-gray-700 mb-2"
      >Amount</label
    >
    <input
      id="amount"
      type="number"
      bind:value={amount}
      placeholder="Enter amount to distribute"
      class="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500"
    />
  </div>

  <!-- Action Buttons -->
  <div class="mt-4 space-x-4">
    <button
      on:click={distributePoints}
      class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Distribute Points
    </button>
    <button
      on:click={fetchTransactions}
      class="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      View Transactions
    </button>
  </div>

  <!-- Transaction List -->
  {#if transactions.length > 0}
    <div class="mt-6">
      <h4 class="text-lg font-bold text-gray-800 mb-4">
        Transactions for {selectedPoint?.name} ({selectedPoint?.symbol})
      </h4>
      <ul class="list-disc pl-6 text-gray-700">
        {#each transactions as tx}
          <li>
            <strong>ID:</strong>
            {tx.transactionId}, <strong>Date:</strong>
            {tx.date}, <strong>Amount:</strong>
            {tx.amount},
            <strong>Recipient:</strong>
            {tx.recipient}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
