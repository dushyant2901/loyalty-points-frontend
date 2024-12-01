<script lang="ts">
  import { API_URL } from "../config";
  import { apiRequest } from "../helpers/helpers";
  import { onMount } from "svelte";

  let brandName = "";
  let brandDescription = "";
  let errorMessage = "";
  let successMessage = "";
  let isLoading = false;

  const getBrandRepId = () => {
    const brandRepId = localStorage.getItem("brandRepId");
    return brandRepId;
  };

  // Submit the brand profile
  const submitBrandProfile = async () => {
    errorMessage = "";
    successMessage = "";

    const brandRepId = getBrandRepId();
    if (!brandRepId) {
      errorMessage = "Brand Representative ID is missing. Please log in.";
      return;
    }

    isLoading = true;

    try {
      const response = await apiRequest(`${API_URL}/api/brand/setup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          brandRepId: brandRepId,
          brandName: brandName,
          description: brandDescription,
        }),
      });

      if (response && response.brandId) {
        successMessage = "Brand profile saved successfully!";
        console.log("Brand Profile Created:", response);
      } else {
        errorMessage = response.message || "Failed to create brand profile.";
      }
    } catch (error) {
      errorMessage = "An error occurred while saving the brand profile.";
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="p-6 bg-white shadow-md rounded-lg">
  <form on:submit|preventDefault={submitBrandProfile}>
    <!-- Brand Name -->
    <div class="mb-4">
      <label for="brandName" class="block text-sm font-bold text-gray-700 mb-2"
        >Brand Name</label
      >
      <input
        type="text"
        id="brandName"
        bind:value={brandName}
        class="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500"
        required
      />
    </div>

    <!-- Brand Description -->
    <div class="mb-4">
      <label
        for="brandDescription"
        class="block text-sm font-bold text-gray-700 mb-2">Description</label
      >
      <textarea
        id="brandDescription"
        bind:value={brandDescription}
        class="w-full p-2 border rounded-md text-gray-700 focus:ring-blue-500"
        rows="4"
        required
      ></textarea>
    </div>

    <!-- Error and Success Messages -->
    {#if errorMessage}
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      >
        <span>{errorMessage}</span>
      </div>
    {/if}

    {#if successMessage}
      <div
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
      >
        <span>{successMessage}</span>
      </div>
    {/if}

    <!-- Submit Button -->
    <div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        {#if isLoading}
          Saving...
        {:else}
          Save Profile
        {/if}
      </button>
    </div>
  </form>
</div>
