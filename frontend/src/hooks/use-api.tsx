import { useEffect, useState } from "react";
import { useAuth } from "./use-auth";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

// Import from the generated declarations
import { idlFactory } from "@/declarations/api/index";
import type { _SERVICE as ApiService } from "@/declarations/api/api.did";

export function useApi() {
  const { identity, isAuthenticated } = useAuth();
  const [apiActor, setApiActor] = useState<ApiService | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Create the actor when identity is available
  useEffect(() => {
    const initActor = async () => {
      if (!identity || !isAuthenticated) {
        setApiActor(null);
        return;
      }

      try {
        // Get canister ID from environment variables
        const canisterId =
          import.meta.env.CANISTER_ID_API || window.ENV?.CANISTER_ID_API;

        if (!canisterId) {
          throw new Error(
            "API canister ID not found. Please check your environment variables."
          );
        }

        // Determine host based on environment
        const host =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname.endsWith(".localhost")
            ? `http://${window.location.hostname}:8000`
            : "https://ic0.app";

        const agent = new HttpAgent({
          host,
          identity,
        });

        // Only fetch root key in development
        if (host !== "https://ic0.app") {
          await agent.fetchRootKey();
        }

        // Create actor using the imported idlFactory
        const actor = Actor.createActor<ApiService>(idlFactory, {
          agent,
          canisterId,
        });

        setApiActor(actor);
      } catch (err) {
        console.error("Failed to create API actor:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to create API actor")
        );
      }
    };

    initActor();
  }, [identity, isAuthenticated]);

  // Function to call whoami()
  const getWhoAmI = async () => {
    if (!apiActor) {
      setError(new Error("API actor not initialized. Are you logged in?"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apiActor.whoami();
      const principalId = result.toString();
      setPrincipal(principalId);
      return principalId;
    } catch (err) {
      console.error("Failed to call whoami():", err);
      setError(
        err instanceof Error ? err : new Error("Failed to call whoami()")
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    apiActor,
    principal,
    loading,
    error,
    getWhoAmI,
  };
}
