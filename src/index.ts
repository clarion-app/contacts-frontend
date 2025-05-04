import { BackendType } from "@clarion-app/types";

export const backend: BackendType = { url: "http://localhost:8000", token: "", user: { id: "", name: "", email: ""} };

export const updateFrontend = (config: BackendType) => {
    backend.url = config.url;
    backend.token = config.token;
    backend.user = config.user;
};

export { contactsApi } from "./contactsApi";
export { groupsApi } from "./groupsApi";
export { phoneApi } from "./phoneApi";
export { emailApi } from "./emailApi";
export { Contacts } from "./Contacts";
export { Contact } from "./Contact";