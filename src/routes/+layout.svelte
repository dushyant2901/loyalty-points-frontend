<script lang="ts">
  import "../app.css";

  import { onMount } from "svelte";

  let user = null;
  let authToken = "";

  // Fetch user data from localStorage
  const checkUserState = () => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");

    if (storedUser && token) {
      user = JSON.parse(storedUser);
      authToken = token;
    }
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    user = null;
    window.location.href = "/login";
  };

  // Check user state when the layout is mounted
  onMount(() => {
    checkUserState();
  });
</script>

<div class="min-h-screen flex flex-col">
  <header
    class="py-4 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
  >
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-4xl font-extrabold leading-tight">Limechain</h1>
      <div>
        {#if user}
          <div>
            <span class="mr-4">Welcome, {user.name}</span>
            <button
              class="bg-red-500 text-white px-3 py-1 rounded"
              on:click={logout}
            >
              Logout
            </button>
          </div>
        {:else}
          <div>
            <a
              href="/login"
              class="text-lg font-semibold bg-white text-blue-600 hover:bg-blue-200 py-2 px-4 rounded-lg mr-4"
              >Login</a
            >
            <a
              href="/register"
              class="text-lg font-semibold text-white bg-blue-700 hover:bg-blue-800 py-2 px-4 rounded-lg"
              >Register</a
            >
          </div>
        {/if}
      </div>
    </div>
  </header>
  <!-- Main Content -->
  <main class="flex-1">
    <slot />
    <!-- This is where the page content will be injected -->
  </main>

  <!-- Footer -->
  <footer class="bg-gray-800 text-gray-300 py-4 text-center">
    <p>&copy; 2024 App Name. All rights reserved.</p>
  </footer>
</div>
