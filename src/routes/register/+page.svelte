<script>
  let email = "";
  let password = "";
  let confirmPassword = "";
  let errorMessage = "";

  const register = async () => {
    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match.";
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        errorMessage = error.message || "Registration failed.";
        return;
      }

      const { token } = await response.json();
      localStorage.setItem("authToken", token);
      window.location.href = "/dashboard";
    } catch (err) {
      errorMessage = "An error occurred. Please try again.";
    }
  };
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
  <h1 class="text-2xl font-bold mb-6 text-gray-800">Create Your Account</h1>
  <form
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
    on:submit|preventDefault={register}
  >
    {#if errorMessage}
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <span>{errorMessage}</span>
      </div>
    {/if}

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        bind:value={email}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        bind:value={password}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
    <div class="mb-6">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        for="confirmPassword"
      >
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        type="password"
        bind:value={confirmPassword}
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        type="submit"
      >
        Register
      </button>
    </div>
  </form>
  <p class="text-sm text-gray-600">
    Already have an account? <a
      href="/login"
      class="text-blue-500 hover:underline">Login</a
    >
  </p>
</div>
