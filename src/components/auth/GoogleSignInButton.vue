<template>
  <button class="google-sign-in-button" type="button" @click="handleSignIn">
    Continue with Google
  </button>
</template>

<script setup lang="ts">

function loadGoogleIdentityServices(): Promise<void> {
  return new Promise((resolve, reject) => {

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]'
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Could not load Google Identity Services.')),
        { once: true }
      )
      return
    }

    // Create Google's script element.
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true

    script.onload = () => resolve()
    script.onerror = () =>
      reject(new Error('Could not load Google Identity Services.'))

    document.head.appendChild(script)
  })
}

async function handleSignIn() {
  try {
    await loadGoogleIdentityServices()
    console.log('Google Identity Services script loaded.')
  } catch (error) {
    console.error(error)
  }
}
// todo
//  At this stage, we have only loaded the library. 
// We have not yet initialised Google sign-in or received an ID token.
//  That will be our next step.
</script>

<style scoped>
.google-sign-in-button {
  padding: 0.65rem 1rem;
  border: 1px solid #dadce0;
  border-radius: 4px;
  background: #fff;
  color: #3c4043;
  cursor: pointer;
  font: inherit;
}
</style>
