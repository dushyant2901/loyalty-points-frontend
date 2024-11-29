<script lang="ts">
  let brandName = "";
  let brandDescription = "";

  const submitBrandProfile = () => {
    console.log("Brand Profile Submitted:", brandName, brandDescription);
    // TODO: Handle form submission
  };
</script>

<div class="p-6 bg-white shadow-md rounded-lg">
  <h3 class="text-xl font-bold text-gray-800 mb-4">
    Set Up Your Brand Profile
  </h3>

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

    <!-- Submit Button -->
    <div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Save Profile
      </button>
    </div>
  </form>
</div>
