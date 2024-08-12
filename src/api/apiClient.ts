import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://ingress-nginx-controller-lb-1029865350.eu-central-1.elb.amazonaws.com",
    // baseURL: "http://localhost:8080",
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;