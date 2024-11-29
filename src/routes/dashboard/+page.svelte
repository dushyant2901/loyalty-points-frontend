<script>
  import SetUpBrandProfile from "../../components/SetUpBrandProfile.svelte";
  import LoyaltyPointManagement from "../../components/LoyaltyPointManagement.svelte";

  let loyaltyPoints = [
    { id: 1, name: "Reward Points", totalSupply: 10000 },
    { id: 2, name: "Membership Points", totalSupply: 5000 },
    { id: 3, name: "Promo Points", totalSupply: 15000 },
  ];
  let activePage = "brand-profile"; // Default active page
</script>

<div class="min-h-screen bg-gray-50 flex">
  <!-- Sidebar -->
  <aside class="w-1/5 bg-blue-600 text-white p-4">
    <h2 class="text-xl font-bold mb-4">Dashboard</h2>
    <nav>
      <ul>
        <li>
          <a
            href="#brand-profile"
            class="block py-2 px-4 mb-2 rounded hover:bg-blue-700"
            on:click={() => (activePage = "brand-profile")}
          >
            Set Up Brand Profile
          </a>
        </li>
        <li>
          <a
            href="#loyalty-issuance"
            class="block py-2 px-4 mb-2 rounded hover:bg-blue-700"
            on:click={() => (activePage = "loyalty-issuance")}
          >
            Issue Loyalty Points
          </a>
        </li>
        <li>
          <a
            href="#manage-loyalty"
            class="block py-2 px-4 mb-2 rounded hover:bg-blue-700"
            on:click={() => (activePage = "manage-loyalty")}
          >
            Manage Loyalty Points
          </a>
        </li>
      </ul>
    </nav>
  </aside>

  <!-- Main Content Area -->
  <main class="flex-1 p-6">
    <div class="bg-white p-4 shadow-lg rounded-lg">
      <!-- Conditional Rendering of Content Based on Active Page -->
      {#if activePage === "brand-profile"}
        <h3 class="text-2xl font-bold text-gray-800 text-center">
          Set Up Brand Profile
        </h3>
        <p class="text-md text-gray-600 mt-2 text-center">
          Here you can set up your brand's details.
        </p>
        <!-- TODO: Brand Component -->
        <div class="w-[500px] mx-auto py-2">
          <SetUpBrandProfile />
        </div>
      {:else if activePage === "loyalty-issuance"}
        <h3 class="text-2xl font-bold text-gray-800 text-center">
          Issue Loyalty Points
        </h3>
        <p class="text-md text-gray-600 mt-2 text-center">
          Create and issue loyalty points for your brand.
        </p>
        <!-- TODO: Add Loyalty Point Issuance Form Component -->
      {:else if activePage === "manage-loyalty"}
        <h3 class="text-2xl font-bold text-gray-800 text-center">
          Manage Loyalty Points
        </h3>
        <p class=" text-center text-md text-gray-600 mt-2">
          View and manage your issued loyalty points.
        </p>
        <div class="w-[500px] mx-auto py-2">
          <LoyaltyPointManagement {loyaltyPoints} />
        </div>
      {/if}
    </div>
  </main>
</div>
