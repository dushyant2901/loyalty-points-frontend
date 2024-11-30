<script>
  let email = "";
  let password = "";

  const login = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Login failed");
      const { token } = await response.json();
      localStorage.setItem("authToken", token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.message);
    }
  };
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
  <h1 class="text-2xl font-bold mb-6 text-gray-800">Login</h1>
  <form
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
    on:submit|preventDefault={login}
  >
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        bind:value={email}
        required
      />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        bind:value={password}
        required
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        type="submit"
      >
        Login
      </button>
    </div>
    <div class="flex items-center justify-between pt-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        type="submit"
        on:click={() => (window.location.href = "/dashboard")}
      >
        Test
      </button>
    </div>
  </form>
  <p class="text-sm text-gray-600">
    Don't have an account? <a
      href="/register"
      class="text-blue-500 hover:underline">Register</a
    >
  </p>
</div>
