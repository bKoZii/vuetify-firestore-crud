/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { VueFire } from 'vuefire'
import vuetify from './vuetify'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

// Types
import type { App } from 'vue'

// FirebaseService
import { firebaseApp } from '@/services/FirebaseService'

export function registerPlugins(app: App) {
  app.use(vuetify)
  app.use(VueFire, { firebaseApp })
  app.use(autoAnimatePlugin)
}
