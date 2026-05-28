import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.aismart.travelplanner",
  appName: "AISMART Travel Planner",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
}

export default config
