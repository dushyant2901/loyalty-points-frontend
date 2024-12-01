<script lang="ts">
  import { API_URL } from "../../config";

  import {
    apiRequest,
    validateEmail,
    validatePassword,
    getPasswordStrength,
  } from "../../helpers/helpers";

  let email: string = "";
  let password: string = "";
  let confirmPassword: string = "";
  let errorMessage: string = "";
  let successMessage: string = "";
  let isLoading: boolean = false;
  let showPassword: boolean = false;
  let passwordStrength: string = "";

  const handlePasswordChange = () => {
    passwordStrength = getPasswordStrength(password);
  };
  // Registration logic
  const register = async () => {
    errorMessage = "";
    successMessage = "";

    // Validate inputs
    if (!validateEmail(email)) {
      errorMessage = "Invalid email address.";
      return;
    }
    if (!validatePassword(password)) {
      errorMessage =
        "Password must be at least 8 characters long, include one uppercase letter, and one number.";
      return;
    }
    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match.";
      return;
    }

    isLoading = true;
    try {
      const result = await apiRequest(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (result && result.access_token && result.brandRepId) {
        // Save to localStorage and redirect
        localStorage.setItem("authToken", result.access_token);
        localStorage.setItem("brandRepId", result.brandRepId);
        successMessage = "Registration successful! Redirecting to dashboard...";
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      }
    } catch (error) {
      // Error message handled inside apiRequest
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
  <h1 class="text-3xl font-bold mb-6 text-gray-800">Create Your Account</h1>

  <!-- Success Message -->
  {#if successMessage}
    <div
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
    >
      <span>{successMessage}</span>
    </div>
  {/if}

  <!-- Form -->
  <form
    class="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md"
    on:submit|preventDefault={register}
  >
    <!-- Error Message -->
    {#if errorMessage}
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <span>{errorMessage}</span>
      </div>
    {/if}

    <!-- Email Field -->
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-medium mb-2" for="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        bind:value={email}
        class="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <!-- Password Field -->
    <div class="mb-4 relative">
      <label
        class="block text-gray-700 text-sm font-medium mb-2"
        for="password"
      >
        Password
      </label>
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        bind:value={password}
        class="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        on:input={handlePasswordChange}
      />
      <button
        type="button"
        class="absolute right-3 top-9 text-sm text-gray-500"
        on:click={() => (showPassword = !showPassword)}
      >
        {showPassword ? "Hide" : "Show"}
      </button>
      <p class="text-xs text-gray-500 mt-1">
        Must be at least 8 characters, include one uppercase letter and one
        number.
      </p>
      <p class="text-sm text-gray-600 mt-2">
        Password Strength: {passwordStrength}
      </p>
    </div>

    <!-- Confirm Password Field -->
    <div class="mb-6">
      <label
        class="block text-gray-700 text-sm font-medium mb-2"
        for="confirmPassword"
      >
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        type="password"
        bind:value={confirmPassword}
        class="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <!-- Register Button -->
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </div>
  </form>

  <!-- Login Link -->
  <p class="text-sm text-gray-600">
    Already have an account? <a
      href="/login"
      class="text-blue-500 hover:underline">Login</a
    >
  </p>
</div>
