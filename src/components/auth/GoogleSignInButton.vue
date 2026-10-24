<template>
  <div>
    <div ref="buttonContainer"></div>
    <p v-if="statusMessage" role="status">
      {{ statusMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

type GoogleCredentialResponse = {
  credential: string
}

type GoogleIdentityServices = {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string
        callback: (response: GoogleCredentialResponse) => void
      }) => void
      renderButton: (
        parent: HTMLElement,
        options: { theme: string; size: string; text: string }
      ) => void
    }
  }
}

declare global {
  interface Window {
    google?: GoogleIdentityServices
  }
}

const buttonContainer = ref<HTMLElement | null>(null)
const statusMessage = ref('')

function loadGoogleIdentityServices(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://accounts.google.com/gsi/client"]'
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), {
        once: true
      })

      existingScript.addEventListener(
        'error',
        () => reject(new Error('Could not load Google Identity Services.')),
        { once: true }
      )

      return
    }

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

onMounted(async () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!clientId) {
    statusMessage.value = 'Missing VITE_GOOGLE_CLIENT_ID in your .env.local file.'
    return
  }

  try {
    await loadGoogleIdentityServices()

    if (!buttonContainer.value || !window.google) {
      throw new Error('Google Identity Services is not available.')
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (!response.credential) {
          statusMessage.value = 'Google did not return an ID token.'
          return
        }
        console.info('Google sign-in succeeded: Vue received an ID token.')
        statusMessage.value = 'Success: Vue received a Google ID token.'
      }
    })

    window.google.accounts.id.renderButton(buttonContainer.value, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with'
    })
  } catch (error) {
    console.error(error)
    statusMessage.value =
      'Could not initialise Google sign-in. Check the browser console.'
  }
})
</script>