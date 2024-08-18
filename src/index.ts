import { BackendType } from "@clarion-app/types";

export const backend: BackendType = { url: "http://localhost:8000", token: "" };

export const initializeContactsFrontend = (setBackendUrl: string) => {
    backend.url = setBackendUrl;
};

export const setContactsFrontendToken = (token: string) => {
    backend.token = token;
};