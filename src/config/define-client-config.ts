import { validateClientConfig } from "@/lib/validate-client-config";
import type { ClientConfig } from "@/types/client-config";

/**
 * Type-checks a client config object at compile time and validates it at build
 * time. Every client config file starts with this call.
 */
export function defineClientConfig(config: ClientConfig): ClientConfig {
  return validateClientConfig(config);
}
