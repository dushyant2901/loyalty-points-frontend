<script lang="ts">
  let step = 1;
  let totalSteps = 3;
  let pointName = "";
  let symbol = "";
  let totalSupply = "";
  let additionalFeatures = "";
  let message = "";

  const nextStep = () => {
    if (step === 1 && (!pointName || !symbol || !totalSupply)) {
      alert("Please fill in all required fields in Step 1.");
      return;
    }
    step++;
  };

  const prevStep = () => {
    if (step > 1) step--;
  };

  const submitLoyaltyPointData = () => {
    console.log({
      pointName,
      symbol,
      totalSupply,
      additionalFeatures,
    });
    message = `Loyalty point "${pointName}" issued successfully with a total supply of ${totalSupply}.`;
    resetForm();
    step = 1;
  };

  const resetForm = () => {
    pointName = "";
    symbol = "";
    totalSupply = "";
    additionalFeatures = "";
  };
</script>

<div class="p-6 bg-white shadow-md rounded-lg">
  <h3 class="text-xl font-bold text-gray-800 mb-6">Issue Loyalty Points</h3>

  <!-- Progress Bar -->
  <div class="relative mb-6">
    <div class="w-full bg-gray-300 rounded-full h-2">
      <div
        class="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style="width: {(step / totalSteps) * 100}%"
      ></div>
    </div>
    <div class="flex justify-between text-sm font-medium text-gray-600 mt-2">
      <span>Step {step}</span>
      <span>{step}/{totalSteps} Complete</span>
    </div>
  </div>

  {#if step === 1}
    <div>
      <h4 class="text-lg font-bold text-gray-800 mb-4">Define Parameters</h4>
      <div class="mb-4">
        <label
          for="pointName"
          class="block text-sm font-bold text-gray-700 mb-2">Point Name</label
        >
        <input
          id="pointName"
          type="text"
          bind:value={pointName}
          placeholder="Enter the name of the loyalty point"
          class="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="symbol" class="block text-sm font-bold text-gray-700 mb-2"
          >Symbol</label
        >
        <input
          id="symbol"
          type="text"
          bind:value={symbol}
          placeholder="Enter the symbol (e.g., RP)"
          class="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500"
          required
        />
      </div>

      <div class="mb-4">
        <label
          for="totalSupply"
          class="block text-sm font-bold text-gray-700 mb-2">Total Supply</label
        >
        <input
          id="totalSupply"
          type="number"
          bind:value={totalSupply}
          placeholder="Enter the total supply of points"
          class="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  {/if}

  {#if step === 2}
    <div>
      <h4 class="text-lg font-bold text-gray-800 mb-4">Configure Features</h4>
      <div class="mb-4">
        <label
          for="additionalFeatures"
          class="block text-sm font-bold text-gray-700 mb-2"
        >
          Additional Features (Optional)
        </label>
        <textarea
          id="additionalFeatures"
          bind:value={additionalFeatures}
          placeholder="Describe any additional features (optional)"
          class="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500"
        ></textarea>
      </div>
    </div>
  {/if}

  {#if step === 3}
    <div>
      <h4 class="text-lg font-bold text-gray-800 mb-4">Confirm and Submit</h4>
      <p class="mb-4"><strong>Point Name:</strong> {pointName}</p>
      <p class="mb-4"><strong>Symbol:</strong> {symbol}</p>
      <p class="mb-4"><strong>Total Supply:</strong> {totalSupply}</p>
      {#if additionalFeatures}
        <p class="mb-4">
          <strong>Additional Features:</strong>
          {additionalFeatures}
        </p>
      {/if}
      <p class="text-sm text-gray-600">
        Click "Submit" to finalize the issuance of this loyalty point.
      </p>
    </div>
  {/if}

  <!-- Navigation Buttons -->
  <div class="mt-6 flex justify-between">
    <button
      type="button"
      on:click={prevStep}
      class="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      disabled={step === 1}
    >
      Previous
    </button>
    {#if step < 3}
      <button
        type="button"
        on:click={nextStep}
        class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Next
      </button>
    {:else}
      <button
        type="button"
        on:click={submitLoyaltyPointData}
        class="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Submit
      </button>
    {/if}
  </div>

  <!-- Success Message -->
  {#if message}
    <p class="mt-4 text-green-500">{message}</p>
  {/if}
</div>
