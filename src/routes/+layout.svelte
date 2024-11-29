<script lang="ts">
  import "../app.css";
</script>

<div class="flex flex-col min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-blue-600 text-white py-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">
        <a href="/">Coalition Loyalty Points</a>
      </h1>
      <nav>
        <ul class="flex space-x-4">
          <li><a href="/dashboard" class="hover:underline">Dashboard</a></li>
          <li><a href="/login" class="hover:underline">Login</a></li>
          <li><a href="/register" class="hover:underline">Register</a></li>
          <!-- TODO: conditional log out and login/register buttons -->
        </ul>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 w-full mx-auto py-6 px-4">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="bg-gray-800 text-gray-300 py-4">
    <div class="container mx-auto text-center">
      <p class="text-sm">
        &copy; 2024 Coalition Loyalty Points. All rights reserved.
      </p>
    </div>
  </footer>
</div>
