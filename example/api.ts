import {request} from "./request"

export namespace Api {
    export interface ApiResponse {
        code: number;
        type: string;
        message: string;
    }
    export interface Category {
        id: number;
        name: string;
    }
    export interface Pet {
        id?: number;
        category?: Category;
        name: string;
        photoUrls: string[];
        tags?: Tag[];
        status?: string;
    }
    export interface Tag {
        id: number;
        name: string;
    }
    export interface Order {
        id: number;
        petId: number;
        quantity: number;
        shipDate: string;
        status: string;
        complete: boolean;
    }
    export interface User {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string;
        userStatus: number;
    }
    export type UserArray = User[];
}
export async function uploadFile(params: {
    petId: number;
}, options?: {
    [key: string]: any;
}) {
    return request<Api.ApiResponse>(`/pet/${params.petId}/uploadImage`, {
        method: "POST",
        params,
        ...(options || {})
    });
}
export async function addPet(body: Api.Pet, options?: {
    [key: string]: any;
}) {
    return request(`/pet`, {
        method: "POST",
        data: body,
        ...(options || {})
    });
}
export async function updatePet(body: Api.Pet, options?: {
    [key: string]: any;
}) {
    return request(`/pet`, {
        method: "PUT",
        data: body,
        ...(options || {})
    });
}
export async function findPetsByStatus(query: {
    status: string[];
}, options?: {
    [key: string]: any;
}) {
    return request<Api.Pet[]>(`/pet/findByStatus`, {
        method: "GET",
        data: query,
        ...(options || {})
    });
}
export async function findPetsByTags(query: {
    tags: string[];
}, options?: {
    [key: string]: any;
}) {
    return request<Api.Pet[]>(`/pet/findByTags`, {
        method: "GET",
        data: query,
        ...(options || {})
    });
}
export async function getPetById(params: {
    petId: number;
}, options?: {
    [key: string]: any;
}) {
    return request<Api.Pet>(`/pet/${params.petId}`, {
        method: "GET",
        params,
        ...(options || {})
    });
}
export async function updatePetWithForm(params: {
    petId: number;
}, options?: {
    [key: string]: any;
}) {
    return request(`/pet/${params.petId}`, {
        method: "POST",
        params,
        ...(options || {})
    });
}
export async function deletePet(params: {
    petId: number;
}, query: {
    api_key: string;
}, options?: {
    [key: string]: any;
}) {
    return request(`/pet/${params.petId}`, {
        method: "DELETE",
        params,
        data: query,
        ...(options || {})
    });
}
export async function placeOrder(body: Api.Order, options?: {
    [key: string]: any;
}) {
    return request<Api.Order>(`/store/order`, {
        method: "POST",
        data: body,
        ...(options || {})
    });
}
export async function getOrderById(params: {
    orderId: number;
}, options?: {
    [key: string]: any;
}) {
    return request<Api.Order>(`/store/order/${params.orderId}`, {
        method: "GET",
        params,
        ...(options || {})
    });
}
export async function deleteOrder(params: {
    orderId: number;
}, options?: {
    [key: string]: any;
}) {
    return request(`/store/order/${params.orderId}`, {
        method: "DELETE",
        params,
        ...(options || {})
    });
}
export async function getInventory(options?: {
    [key: string]: any;
}) {
    return request<any>(`/store/inventory`, {
        method: "GET",
        ...(options || {})
    });
}
export async function createUsersWithArrayInput(body: Api.UserArray, options?: {
    [key: string]: any;
}) {
    return request(`/user/createWithArray`, {
        method: "POST",
        data: body,
        ...(options || {})
    });
}
export async function createUsersWithListInput(body: Api.UserArray, options?: {
    [key: string]: any;
}) {
    return request(`/user/createWithList`, {
        method: "POST",
        data: body,
        ...(options || {})
    });
}
export async function getUserByName(params: {
    username: string;
}, options?: {
    [key: string]: any;
}) {
    return request<Api.User>(`/user/${params.username}`, {
        method: "GET",
        params,
        ...(options || {})
    });
}
export async function updateUser(params: {
    username: string;
}, body: Api.User, options?: {
    [key: string]: any;
}) {
    return request(`/user/${params.username}`, {
        method: "PUT",
        params,
        data: body,
        ...(options || {})
    });
}
export async function deleteUser(params: {
    username: string;
}, options?: {
    [key: string]: any;
}) {
    return request(`/user/${params.username}`, {
        method: "DELETE",
        params,
        ...(options || {})
    });
}
export async function loginUser(query: {
    username: string;
    password: string;
}, options?: {
    [key: string]: any;
}) {
    return request<string>(`/user/login`, {
        method: "GET",
        data: query,
        ...(options || {})
    });
}
export async function logoutUser(options?: {
    [key: string]: any;
}) {
    return request(`/user/logout`, {
        method: "GET",
        ...(options || {})
    });
}
export async function createUser(body: Api.User, options?: {
    [key: string]: any;
}) {
    return request(`/user`, {
        method: "POST",
        data: body,
        ...(options || {})
    });
}
